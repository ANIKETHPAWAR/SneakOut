import React, { useEffect, useState } from 'react';
import { apiService } from '../utils/apiService';
import SpotCard from './SpotCard';
import SpotDetailModal from './SpotDetailModal';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { FeaturedSpotsSkeleton } from './LoadingSkeleton';

// Responsive visible count based on screen size
const getVisibleCount = () => {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth < 640) return 1; // mobile
  if (window.innerWidth < 1024) return 2; // tablet
  return 3; // desktop
};

const SkeletonCard = () => (
  <div className="w-full h-[340px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse shadow-lg" />
);

const FeaturedSpots = () => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount());
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const spotsData = await apiService.getFeaturedSpots();
        setSpots(spotsData);
      } catch (error) {
        console.error('Failed to load featured spots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % spots.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + spots.length) % spots.length);
  };

  const handleSpotClick = (spot) => {
    setSelectedSpot(spot);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpot(null);
  };

  // --- Carousel sliding logic ---
  // Card width in px (should match the card's width in Tailwind)
  const CARD_WIDTH = 320 + 32; // 320px card + 32px gap

  // Auto-advance carousel always, on all screen sizes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const next = prev + 1;
        // Loop back to start if at end
        return next > spots.length - visibleCount ? 0 : next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [spots.length, visibleCount]);

  if (loading) return <FeaturedSpotsSkeleton />;
  if (spots.length === 0) return null;

  return (
    <div className="mb-16">
      {/* Enhanced Header */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400 drop-shadow-sm" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Spots</h2>
        </div>
      </div>

      {/* Enhanced Carousel Container */}
      <div id="featured-spots-carousel" className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-100 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 via-transparent to-blue-50/30" />
        <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-purple-200/20 rounded-full blur-2xl sm:blur-3xl -translate-x-12 sm:-translate-x-16 -translate-y-12 sm:-translate-y-16" />
        <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-40 sm:h-40 bg-blue-200/20 rounded-full blur-2xl sm:blur-3xl translate-x-14 sm:translate-x-20 translate-y-14 sm:translate-y-20" />
        
        {/* Enhanced Navigation Buttons */}
        {spots.length > visibleCount && !loading && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 sm:p-3 shadow-lg sm:shadow-xl transition-all duration-300 border border-gray-200/50 hover:shadow-xl sm:hover:shadow-2xl hover:scale-110 group"
              aria-label="Previous spots"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-purple-600 transition-colors" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2 sm:p-3 shadow-lg sm:shadow-xl transition-all duration-300 border border-gray-200/50 hover:shadow-xl sm:hover:shadow-2xl hover:scale-110 group"
              aria-label="Next spots"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-purple-600 transition-colors" />
            </button>
          </>
        )}

        {/* Enhanced Spots Container */}
        <div className="relative px-4 sm:px-8 py-8 sm:py-12 overflow-hidden">
          {/* Sliding Carousel Row */}
          <div
            className="flex gap-8 transition-transform duration-700 ease-in-out"
            style={{
              width: `${spots.length * CARD_WIDTH}px`,
              transform: `translateX(-${currentIndex * CARD_WIDTH}px)`
            }}
          >
            {spots.map((spot) => (
              <div
                key={spot._id}
                className="w-[320px] flex-shrink-0"
              >
                <SpotCard spot={spot} onClick={handleSpotClick} />
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicators */}
        {spots.length > visibleCount && (
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
            {Array.from({ length: Math.ceil(spots.length / visibleCount) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * visibleCount)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / visibleCount) === index
                    ? 'bg-purple-600 w-4 sm:w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Spot Detail Modal */}
      <SpotDetailModal
        spot={selectedSpot}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default FeaturedSpots; 