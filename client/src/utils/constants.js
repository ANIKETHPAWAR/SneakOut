import { MapPin } from 'lucide-react';

// App categories with consistent styling
export const CATEGORIES = [
  { name: 'Adventure', color: 'bg-green-100 text-green-800', iconColor: 'text-green-500' },
  { name: 'Photo', color: 'bg-blue-100 text-blue-800', iconColor: 'text-blue-500' },
  { name: 'Food', color: 'bg-orange-100 text-orange-800', iconColor: 'text-orange-500' },
  { name: 'Hidden', color: 'bg-purple-100 text-purple-800', iconColor: 'text-purple-500' },
  { name: 'Cultural', color: 'bg-red-100 text-red-800', iconColor: 'text-red-500' },
  { name: 'Nature', color: 'bg-emerald-100 text-emerald-800', iconColor: 'text-emerald-500' },
  { name: 'Urban', color: 'bg-gray-100 text-gray-800', iconColor: 'text-gray-500' },
  { name: 'Other', color: 'bg-slate-100 text-slate-800', iconColor: 'text-slate-500' },
];

// App statistics
export const APP_STATS = {
  hiddenSpots: '8.7k+',
  explorers: '25k+',
  cities: '150+',
  averageRating: '4.9'
};

// API endpoints
export const API_BASE_URL = "https://sneakout-ssom.onrender.com";
export const API_ENDPOINTS = {
  base: API_BASE_URL,
  featured: '/spots/featured/list',
  spots: '/spots',
  user: '/user/me'
}; 