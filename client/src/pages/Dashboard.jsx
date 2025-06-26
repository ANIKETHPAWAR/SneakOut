import React, { useState, useEffect } from 'react';
import { MapPin, Menu, Search, Star, X, LogOut, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SpotsList from '../components/SpotsList';
import FeaturedSpots from '../components/FeaturedSpots';
import SpotCard from '../components/SpotCard';
import axios from 'axios';

const categories = [
  { name: 'Adventure', color: 'bg-green-100 text-green-800', icon: <MapPin className="w-8 h-8 text-green-500" /> },
  { name: 'Photo', color: 'bg-blue-100 text-blue-800', icon: <MapPin className="w-8 h-8 text-blue-500" /> },
  { name: 'Food', color: 'bg-orange-100 text-orange-800', icon: <MapPin className="w-8 h-8 text-orange-500" /> },
  { name: 'Hidden', color: 'bg-purple-100 text-purple-800', icon: <MapPin className="w-8 h-8 text-purple-500" /> },
  { name: 'Cultural', color: 'bg-red-100 text-red-800', icon: <MapPin className="w-8 h-8 text-red-500" /> },
  { name: 'Nature', color: 'bg-emerald-100 text-emerald-800', icon: <MapPin className="w-8 h-8 text-emerald-500" /> },
  { name: 'Urban', color: 'bg-gray-100 text-gray-800', icon: <MapPin className="w-8 h-8 text-gray-500" /> },
  { name: 'Other', color: 'bg-slate-100 text-slate-800', icon: <MapPin className="w-8 h-8 text-slate-500" /> },
];

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categorySpots, setCategorySpots] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      axios.get(`http://localhost:3000/SneakOut/spots?category=${selectedCategory.toLowerCase()}`)
        .then(res => setCategorySpots(res.data.spots || []))
        .finally(() => setLoading(false));
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center fixed top-0 left-0 right-0 z-50 justify-between w-full px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <span className="ml-2 text-2xl font-bold text-gray-900">SneakOut</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="#explore" className="text-gray-700 hover:text-indigo-600 transition-colors">Explore</Link>
          <Link to="#categories" className="text-gray-700 hover:text-indigo-600 transition-colors">Categories</Link>
          <Link to="#community" className="text-gray-700 hover:text-indigo-600 transition-colors">Community</Link>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add a Spot
          </button>
          <button 
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
        
        <button className="p-2 rounded hover:bg-gray-200 transition md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>

        {/* Mobile Layout */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 top-full right-0 bg-white border-t border-gray-200">
            <div className="px-4 py-3 space-y-3">
              <Link to="#explore" className="block text-gray-700 hover:text-indigo-600">Explore</Link>
              <Link to="#categories" className="block text-gray-700 hover:text-indigo-600">Categories</Link>
              <Link to="#community" className="block text-gray-700 hover:text-indigo-600">Community</Link>
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add a Spot
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-gray-700 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20 px-4 py-8">
        {/* Welcome Section */}
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
                <span className="text-3xl font-bold text-yellow-400">8.7k+</span>
                <span className="text-purple-100 mt-1">Hidden Spots</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-green-400">25k+</span>
                <span className="text-purple-100 mt-1">Explorers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-blue-400">150+</span>
                <span className="text-purple-100 mt-1">Cities</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-purple-200">4.9</span>
                  <Star className="w-4 h-4 text-yellow-300" />
                </div>
                <span className="text-purple-100 mt-1">Average Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Explore by Category */}
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Explore by Category</h2>
          <p className="text-gray-600 text-center mb-6">Whether you're seeking adventure, perfect shots, amazing food, or sports activities, we've got you covered.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex flex-col items-center justify-center rounded-2xl p-6 shadow hover:shadow-lg transition-all border-2 ${cat.color} ${selectedCategory === cat.name ? 'ring-4 ring-purple-400' : ''}`}
              >
                {cat.icon}
                <span className="mt-4 text-xl font-semibold">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Spots for Selected Category */}
        {selectedCategory && (
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{selectedCategory} Spots</h3>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : categorySpots.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No spots found for this category.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categorySpots.map((spot) => (
                  <SpotCard key={spot._id} spot={spot} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Featured Hidden Gems */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Featured Hidden Gems</h2>
          <p className="text-gray-600 text-center mb-6">Recently discovered spots that are trending in the community</p>
          <FeaturedSpots />
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 