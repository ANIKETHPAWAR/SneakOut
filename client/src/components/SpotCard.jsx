import React from 'react';
import { MapPin, Star, Clock, User } from 'lucide-react';
import { getCategoryColor, getDifficultyColor } from '../utils/colors';
import { motion } from 'framer-motion';

// Consider adding PropTypes or converting to TypeScript for type safety in production.
const SpotCard = ({ spot, onClick }) => {
  const handleClick = () => {
    if (onClick) onClick(spot);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(80,0,200,0.10)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 hover:border-purple-300 overflow-hidden cursor-pointer transform transition-all duration-300"
      onClick={handleClick}
      tabIndex={0}
      role="button"
    >
      {/* Image Section */}
      <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-500 relative">
        {spot.images && spot.images.length > 0 ? (
          <img 
            src={spot.images[0].url} 
            alt={spot.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MapPin className="w-12 h-12 text-white opacity-50" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(spot.category)}`}>
          {spot.category}
        </div>
        
        {/* Rating */}
        {spot.rating && spot.rating.average > 0 && (
          <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium">{spot.rating.average.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {spot.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {spot.description}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{spot.location.city}, {spot.location.country}</span>
        </div>

        {/* Tags */}
        {spot.tags && spot.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {spot.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className={`font-medium ${getDifficultyColor(spot.difficulty)}`}>
              {spot.difficulty}
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{spot.bestTime}</span>
            </div>
          </div>
          
          {spot.createdBy && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <User className="w-3 h-3" />
              <span>{spot.createdBy.firstName}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SpotCard; 