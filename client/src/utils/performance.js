// Performance monitoring and optimization utilities

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.startTime = performance.now();
  }

  // Start timing a specific operation
  startTimer(name) {
    this.metrics[name] = {
      start: performance.now(),
      end: null,
      duration: null
    };
  }

  // End timing and calculate duration
  endTimer(name) {
    if (this.metrics[name]) {
      this.metrics[name].end = performance.now();
      this.metrics[name].duration = this.metrics[name].end - this.metrics[name].start;
      
      // Log slow operations
      if (this.metrics[name].duration > 1000) {
        console.warn(`Slow operation detected: ${name} took ${this.metrics[name].duration.toFixed(2)}ms`);
      }
    }
  }

  // Get timing for a specific operation
  getTimer(name) {
    return this.metrics[name]?.duration || 0;
  }

  // Get all metrics
  getAllMetrics() {
    return this.metrics;
  }

  // Measure page load time
  measurePageLoad() {
    window.addEventListener('load', () => {
      const loadTime = performance.now() - this.startTime;
      console.log(`Page load time: ${loadTime.toFixed(2)}ms`);
      
      // Send to analytics if needed
      if (loadTime > 3000) {
        console.warn('Slow page load detected');
      }
    });
  }

  // Monitor API response times
  monitorApiCalls() {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const start = performance.now();
      try {
        const response = await originalFetch(...args);
        const duration = performance.now() - start;
        
        if (duration > 2000) {
          console.warn(`Slow API call: ${args[0]} took ${duration.toFixed(2)}ms`);
        }
        
        return response;
      } catch (error) {
        const duration = performance.now() - start;
        console.error(`API call failed after ${duration.toFixed(2)}ms:`, error);
        throw error;
      }
    };
  }
}

// Image optimization utilities
export const imageOptimizer = {
  // Lazy load images
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  },

  // Preload critical images
  preloadImages(urls) {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }
};

// Bundle optimization
export const bundleOptimizer = {
  // Split large components
  async loadComponent(componentPath) {
    try {
      const module = await import(componentPath);
      return module.default;
    } catch (error) {
      console.error('Failed to load component:', error);
      return null;
    }
  },

  // Preload routes
  preloadRoute(routePath) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = routePath;
    document.head.appendChild(link);
  }
};

// Memory management
export const memoryManager = {
  // Clear unused caches
  clearUnusedCaches() {
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          if (cacheName.includes('sneakout')) {
            caches.delete(cacheName);
          }
        });
      });
    }
  },

  // Monitor memory usage
  monitorMemory() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        const usedMB = memory.usedJSHeapSize / 1048576;
        const totalMB = memory.totalJSHeapSize / 1048576;
        
        if (usedMB > 100) {
          console.warn(`High memory usage: ${usedMB.toFixed(2)}MB / ${totalMB.toFixed(2)}MB`);
        }
      }, 30000); // Check every 30 seconds
    }
  }
};

// Initialize performance monitoring
export const performanceMonitor = new PerformanceMonitor();

// Start monitoring
export const initPerformanceMonitoring = () => {
  performanceMonitor.measurePageLoad();
  performanceMonitor.monitorApiCalls();
  memoryManager.monitorMemory();
  
  // Lazy load images
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      imageOptimizer.lazyLoadImages();
    });
  }
};

export default {
  performanceMonitor,
  imageOptimizer,
  bundleOptimizer,
  memoryManager,
  initPerformanceMonitoring
}; 