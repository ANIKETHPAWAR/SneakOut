import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpotCard from './SpotCard';
import SpotDetailModal from './SpotDetailModal';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_ENDPOINTS } from '../utils/constants';

const VISIBLE_COUNT = 4;

const FeaturedSpots = () => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.base}${API_ENDPOINTS.featured}`);
        setSpots(response.data);
      } catch (error) {
        console.error('Failed to load featured spots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  const getVisibleSpots = () => {
    if (spots.length <= VISIBLE_COUNT) return spots;
    
    const visible = [];
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      const index = (currentIndex + i) % spots.length;
      visible.push(spots[index]);
    }
    return visible;
  };

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

  // Auto-advance carousel
  useEffect(() => {
    if (spots.length <= VISIBLE_COUNT) return;
    
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [spots.length]);

  if (loading || spots.length === 0) return null;

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl font-bold text-gray-900">Featured Spots</h2>
      </div>

      {/* Carousel Container */}
      <div className="relative bg-white rounded-2xl shadow-lg px-2 py-6 mb-6">
        {/* Navigation Buttons */}
        {spots.length > VISIBLE_COUNT && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-purple-100 rounded-full p-2 shadow-lg transition-all duration-200 border border-gray-200"
              aria-label="Previous spots"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-purple-100 rounded-full p-2 shadow-lg transition-all duration-200 border border-gray-200"
              aria-label="Next spots"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}

        {/* Spots Grid */}
        <div className="overflow-hidden rounded-xl">
          <div
            key={currentIndex}
            className="flex gap-6 transition-transform duration-1000 ease-in-out"
            style={{ minWidth: '1200px' }}
          >
            {getVisibleSpots().map((spot) => (
              <div key={spot._id} className="w-[280px] flex-shrink-0">
                <SpotCard spot={spot} onClick={handleSpotClick} />
              </div>
            ))}
          </div>
        </div>
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