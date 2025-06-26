import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpotCard from './SpotCard';
import SpotDetailModal from './SpotDetailModal';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const VISIBLE_COUNT = 4;

const FeaturedSpots = () => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/SneakOut/spots/featured/list')
      .then(res => setSpots(res.data))
      .catch(() => setError('Could not load featured spots.'))
      .finally(() => setLoading(false));
  }, []);

  // Filmstrip logic
  const getVisibleSpots = () => {
    if (spots.length <= VISIBLE_COUNT) return spots;
    const visible = [];
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      visible.push(spots[(currentIndex + i) % spots.length]);
    }
    return visible;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % spots.length;
      console.log('Next index:', next);
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + spots.length) % spots.length;
      console.log('Prev index:', next);
      return next;
    });
  };

  useEffect(() => {
    if (spots.length > VISIBLE_COUNT) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [spots.length, currentIndex]);

  if (loading) return null;
  if (error || spots.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl font-bold text-gray-900">Featured Spots</h2>
      </div>
      <div className="relative bg-white rounded-2xl shadow-lg px-2 py-6 mb-6">
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-purple-100 rounded-full p-2 shadow-lg transition-all duration-200 border border-gray-200"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-purple-100 rounded-full p-2 shadow-lg transition-all duration-200 border border-gray-200"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
        <div className="overflow-hidden rounded-xl">
          <div
            key={currentIndex}
            className="flex gap-6 transition-transform duration-1000 ease-in-out"
            style={{ minWidth: '1200px' }}
          >
            {getVisibleSpots().map((spot) => (
              <div key={spot._id} className="w-[280px] flex-shrink-0">
                <SpotCard spot={spot} onClick={() => { setSelectedSpot(spot); setIsModalOpen(true); }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <SpotDetailModal
        spot={selectedSpot}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FeaturedSpots; 