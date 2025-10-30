import { MapPin } from 'lucide-react';

// App categories with consistent styling
export const CATEGORIES = [
  { name: 'Adventure', color: 'bg-gradient-to-br from-green-50 to-emerald-100 text-green-800 border-green-200', iconColor: 'text-green-600' },
  { name: 'Photo', color: 'bg-gradient-to-br from-blue-50 to-cyan-100 text-blue-800 border-blue-200', iconColor: 'text-blue-600' },
  { name: 'Food', color: 'bg-gradient-to-br from-orange-50 to-amber-100 text-orange-800 border-orange-200', iconColor: 'text-orange-600' },
  { name: 'Hidden', color: 'bg-gradient-to-br from-purple-50 to-violet-100 text-purple-800 border-purple-200', iconColor: 'text-purple-600' },
  { name: 'Cultural', color: 'bg-gradient-to-br from-red-50 to-rose-100 text-red-800 border-red-200', iconColor: 'text-red-600' },
  { name: 'Nature', color: 'bg-gradient-to-br from-emerald-50 to-green-100 text-emerald-800 border-emerald-200', iconColor: 'text-emerald-600' },
  { name: 'Urban', color: 'bg-gradient-to-br from-gray-50 to-slate-100 text-gray-800 border-gray-200', iconColor: 'text-gray-600' },
  { name: 'Other', color: 'bg-gradient-to-br from-slate-50 to-gray-100 text-slate-800 border-slate-200', iconColor: 'text-slate-600' },
];

// App statistics
export const APP_STATS = {
  hiddenSpots: '8.7k+',
  explorers: '25k+',
  cities: '150+',
  averageRating: '4.9'
};

// API endpoints
// Read from env; fall back to production Render URL
export const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
    ? import.meta.env.VITE_API_BASE_URL
    : "https://sneakout-kxmb.onrender.com";

export const API_ENDPOINTS = {
  base: API_BASE_URL,
  user: "/SneakOut/user/me",
  spots: "/SneakOut/spots",
  featured: "/SneakOut/spots/featured/list",
  // Add other endpoints as needed
}; 