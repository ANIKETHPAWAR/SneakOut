import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import WelcomeSection from '../components/WelcomeSection';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedSpots from '../components/FeaturedSpots';
import SpotCard from '../components/SpotCard';
import { API_ENDPOINTS } from '../utils/constants';

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categorySpots, setCategorySpots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCategory) {
      setCategorySpots([]);
      return;
    }

    const fetchCategorySpots = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_ENDPOINTS.base}${API_ENDPOINTS.spots}?category=${selectedCategory.toLowerCase()}`);
        setCategorySpots(response.data.spots || []);
      } catch (error) {
        console.error('Failed to fetch category spots:', error);
        setCategorySpots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorySpots();
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 px-4 py-8">
        <WelcomeSection user={user} />
        
        <CategoryGrid 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        {/* Category Spots */}
        {selectedCategory && (
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              {selectedCategory} Spots
            </h3>
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

        {/* Featured Spots */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Featured Hidden Gems</h2>
          <p className="text-gray-600 text-center mb-6">
            Recently discovered spots that are trending in the community
          </p>
          <FeaturedSpots />
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 