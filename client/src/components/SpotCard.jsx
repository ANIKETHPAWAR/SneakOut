import React from 'react';
import { MapPin, Star, Clock, User } from 'lucide-react';

const SpotCard = ({ spot, onClick }) => {
  const getCategoryColor = (category) => {
    const colors = {
      food: 'bg-orange-100 text-orange-800',
      adventure: 'bg-green-100 text-green-800',
      photo: 'bg-blue-100 text-blue-800',
      hidden: 'bg-purple-100 text-purple-800',
      cultural: 'bg-red-100 text-red-800',
      nature: 'bg-emerald-100 text-emerald-800',
      urban: 'bg-gray-100 text-gray-800',
      other: 'bg-slate-100 text-slate-800'
    };
    return colors[category] || colors.other;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'text-green-600',
      medium: 'text-yellow-600',
      hard: 'text-red-600'
    };
    return colors[difficulty] || colors.easy;
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
      onClick={() => onClick && onClick(spot)}
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
    </div>
  );
};

export default SpotCard; 