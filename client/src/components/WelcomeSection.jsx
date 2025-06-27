import React from 'react';
import { Star } from 'lucide-react';
import { APP_STATS } from '../utils/constants';

const WelcomeSection = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto mb-8">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-8 text-center text-white">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome back, <span className="text-yellow-400">{user?.firstName || 'Explorer'}!</span>
        </h1>
        <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto mb-6">
          Discover hidden gems, amazing photo locations, and adventure trails that only locals know about.
        </p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-yellow-400">{APP_STATS.hiddenSpots}</span>
            <span className="text-purple-100 mt-1">Hidden Spots</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-green-400">{APP_STATS.explorers}</span>
            <span className="text-purple-100 mt-1">Explorers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-400">{APP_STATS.cities}</span>
            <span className="text-purple-100 mt-1">Cities</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-purple-200">{APP_STATS.averageRating}</span>
              <Star className="w-4 h-4 text-yellow-300" />
            </div>
            <span className="text-purple-100 mt-1">Average Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection; 