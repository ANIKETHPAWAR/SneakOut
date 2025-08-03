import React from 'react';

// Skeleton for spot cards
export const SpotCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300" />
    <div className="p-4">
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
      <div className="h-3 bg-gray-200 rounded mb-3 w-1/2" />
      <div className="flex items-center gap-2 mb-3">
        <div className="h-4 w-4 bg-gray-200 rounded" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded-full px-3 py-1 w-16" />
        <div className="h-6 bg-gray-200 rounded-full px-3 py-1 w-20" />
      </div>
    </div>
  </div>
);

// Skeleton for featured spots carousel
export const FeaturedSpotsSkeleton = () => (
  <div className="mb-16">
    <div className="flex items-center justify-center gap-3 mb-8">
      <div className="h-7 w-7 bg-gray-200 rounded animate-pulse" />
      <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
    </div>
    
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="px-4 sm:px-8 py-8 sm:py-12">
        <div className="flex gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-[320px] flex-shrink-0">
              <SpotCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Skeleton for category grid
export const CategoryGridSkeleton = () => (
  <div className="max-w-5xl mx-auto mb-12">
    <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8 animate-pulse" />
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse" />
      ))}
    </div>
  </div>
);

// Skeleton for dashboard
export const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="pt-20 px-4 py-8">
      {/* Welcome section skeleton */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
      </div>
      
      {/* Categories skeleton */}
      <CategoryGridSkeleton />
      
      {/* Featured spots skeleton */}
      <FeaturedSpotsSkeleton />
    </div>
  </div>
);

// Skeleton for modal
export const ModalSkeleton = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-200" />
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-3 w-3/4" />
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2" />
        <div className="h-4 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded mb-2 w-5/6" />
        <div className="h-4 bg-gray-200 rounded mb-4 w-4/6" />
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 rounded-full px-4 py-1 w-20" />
          <div className="h-8 bg-gray-200 rounded-full px-4 py-1 w-24" />
        </div>
      </div>
    </div>
  </div>
);

export default {
  SpotCardSkeleton,
  FeaturedSpotsSkeleton,
  CategoryGridSkeleton,
  DashboardSkeleton,
  ModalSkeleton,
}; 