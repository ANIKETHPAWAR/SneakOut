import axios from 'axios';
import { API_ENDPOINTS } from './constants';

// Cache for storing API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Request deduplication
const pendingRequests = new Map();

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_ENDPOINTS.base,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Cache utility functions
const getCacheKey = (url, params = {}) => {
  return `${url}?${JSON.stringify(params)}`;
};

const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

const getFromCache = (key) => {
  const cached = cache.get(key);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

const setCache = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

// Generic API request function with caching and deduplication
const apiRequest = async (method, url, data = null, params = {}, useCache = true) => {
  const cacheKey = getCacheKey(url, params);
  
  // Check cache for GET requests
  if (useCache && method === 'GET') {
    const cachedData = getFromCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  }

  // Check for pending requests
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  // Make the request
  const requestPromise = apiClient.request({
    method,
    url,
    data,
    params,
  }).then((response) => {
    // Cache successful GET responses
    if (useCache && method === 'GET') {
      setCache(cacheKey, response.data);
    }
    pendingRequests.delete(cacheKey);
    return response.data;
  }).catch((error) => {
    pendingRequests.delete(cacheKey);
    throw error;
  });

  pendingRequests.set(cacheKey, requestPromise);
  return requestPromise;
};

// Specific API functions
export const apiService = {
  // User endpoints
  getCurrentUser: () => apiRequest('GET', API_ENDPOINTS.user),
  
  // Spots endpoints
  getSpots: (params = {}) => apiRequest('GET', API_ENDPOINTS.spots, null, params),
  getFeaturedSpots: () => apiRequest('GET', API_ENDPOINTS.featured),
  getSpotById: (id) => apiRequest('GET', `${API_ENDPOINTS.spots}/${id}`),
  
  // Auth endpoints
  login: (credentials) => apiRequest('POST', '/SneakOut/user/login', credentials, {}, false),
  register: (userData) => apiRequest('POST', '/SneakOut/user/register', userData, {}, false),
  
  // Clear cache
  clearCache: () => {
    cache.clear();
    pendingRequests.clear();
  },
  
  // Preload critical data
  preloadData: async () => {
    try {
      // Preload featured spots in background
      apiRequest('GET', API_ENDPOINTS.featured).catch(() => {});
    } catch (error) {
      console.warn('Preload failed:', error);
    }
  },
};

export default apiService; 