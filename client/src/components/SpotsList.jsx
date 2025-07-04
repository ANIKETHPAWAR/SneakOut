import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpotCard from './SpotCard';
import SpotDetailModal from './SpotDetailModal';
import { Loader2, AlertCircle, Search, Filter, MapPin } from 'lucide-react';
import Button from './Button';

const SpotsList = () => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    'food', 'adventure', 'photo', 'hidden', 'cultural', 'nature', 'urban', 'other'
  ];

  useEffect(() => {
    fetchSpots();
  }, []);

  // Add useEffect to refetch when category changes
  useEffect(() => {
    fetchSpots();
  }, [selectedCategory]);

  const fetchSpots = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      
      const response = await axios.get(`http://localhost:3000/SneakOut/spots?${params}`);
      setSpots(response.data.spots || response.data);
    } catch (err) {
      console.error('Error fetching spots:', err);
      setError('Failed to load spots. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSpots();
  };

  const handleCategoryChange = (category) => {
    const newCategory = category === selectedCategory ? '' : category;
    setSelectedCategory(newCategory);
    // We'll implement the filter in the next step
  };

  const handleSpotClick = (spot) => {
    setSelectedSpot(spot);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpot(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading spots...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchSpots}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <form onSubmit={handleSearch} className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search spots..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 mr-2">Categories:</span>
          {categories.map((category) => (
            <Button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {spots.length} {spots.length === 1 ? 'Spot' : 'Spots'} Found
        </h2>
        {selectedCategory && (
          <span className="text-sm text-gray-600">
            Filtered by: <span className="font-medium capitalize">{selectedCategory}</span>
          </span>
        )}
      </div>

      {/* Spots Grid */}
      {spots.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No spots found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedCategory 
              ? 'Try adjusting your search or filters'
              : 'Be the first to add a spot!'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {spots.map((spot) => (
            <SpotCard key={spot._id} spot={spot} onClick={handleSpotClick} />
          ))}
        </div>
      )}

      {/* Spot Detail Modal */}
      <SpotDetailModal 
        spot={selectedSpot} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default SpotsList; 