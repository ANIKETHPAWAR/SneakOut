const CACHE_NAME = 'sneakout-v2';
const STATIC_CACHE = 'sneakout-static-v2';
const API_CACHE = 'sneakout-api-v2';

// Only cache essential files that definitely exist
const STATIC_FILES = [
  '/',
  '/index.html',
];

// Install event - cache static files with error handling
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('Caching static files...');
      // Only cache the most essential files
      return cache.addAll(STATIC_FILES).catch(error => {
        console.warn('Some files failed to cache:', error);
        // Continue even if caching fails
        return Promise.resolve();
      });
    }).catch(error => {
      console.warn('Failed to open cache:', error);
      // Don't fail the installation
      return Promise.resolve();
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== API_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle API requests
  if (url.pathname.includes('/SneakOut/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle static files
  event.respondWith(handleStaticRequest(request));
});

async function handleApiRequest(request) {
  const cache = await caches.open(API_CACHE);
  
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const clonedResponse = networkResponse.clone();
      cache.put(request, clonedResponse).catch(() => {
        // Ignore cache errors
      });
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response
    return new Response(
      JSON.stringify({ error: 'No internet connection' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  
  try {
    // Try cache first for static files
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback to network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const clonedResponse = networkResponse.clone();
      cache.put(request, clonedResponse).catch(() => {
        // Ignore cache errors
      });
    }
    
    return networkResponse;
  } catch (error) {
    // Return offline page for document requests
    if (request.destination === 'document') {
      const offlineResponse = await cache.match('/index.html');
      if (offlineResponse) {
        return offlineResponse;
      }
    }
    
    // Return a simple offline response
    return new Response('Offline', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Background sync triggered');
} 