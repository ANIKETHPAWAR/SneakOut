import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaMapMarkerAlt, FaListAlt, FaImages } from 'react-icons/fa';
import Button from './Button';
import SpotBasicInfo from './AddSpot/SpotBasicInfo';
import SpotLocation from './AddSpot/SpotLocation';
import SpotDetails from './AddSpot/SpotDetails';
import SpotImages from './AddSpot/SpotImages';
import { API_ENDPOINTS } from '../utils/constants';

const AddSpotForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    location: {
      address: '',
      city: '',
      country: '',
      coordinates: [0, 0]
    },
    difficulty: 'easy',
    bestTime: 'anytime',
    tags: [],
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Swap coordinates to [lng, lat] for backend
    const formDataToSend = {
      ...formData,
      location: {
        ...formData.location,
        coordinates: [formData.location.coordinates[1], formData.location.coordinates[0]]
      }
    };

    try {
      const response = await fetch(`${API_ENDPOINTS.base}${API_ENDPOINTS.spots}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formDataToSend)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create spot');
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.description.trim() &&
      formData.category &&
      formData.location.address.trim() &&
      formData.location.city.trim() &&
      formData.location.country.trim()
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-10">
      <div className="relative w-full max-w-3xl mx-auto rounded-3xl shadow-2xl bg-white p-0 md:p-0 min-h-[80vh] flex flex-col">
        {/* Accent bar */}
        <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500" />
        <div className="p-8 md:p-12 flex-1 flex flex-col">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight flex items-center gap-2">
            <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">Add New Spot</span>
          </h1>
          <p className="text-gray-500 mb-8 text-lg">Share a hidden gem or cool place with the community!</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form id="add-spot-form" onSubmit={handleSubmit} className="space-y-10 flex-1">
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-4">
                <FaInfoCircle className="text-indigo-500 text-xl" />
                <h2 className="text-lg font-semibold text-gray-800">Basic Info</h2>
              </div>
              <div className="rounded-2xl border border-indigo-100 shadow-sm bg-white/80 p-6">
                <SpotBasicInfo 
                  formData={formData} 
                  onInputChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="mb-2">
              <div className="flex items-center gap-2 mb-4">
                <FaMapMarkerAlt className="text-indigo-500 text-xl" />
                <h2 className="text-lg font-semibold text-gray-800">Location</h2>
              </div>
              <div className="rounded-2xl border border-indigo-100 shadow-lg bg-white/80 p-6">
                <SpotLocation 
                  formData={formData} 
                  onInputChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="mb-2">
              <div className="flex items-center gap-2 mb-4">
                <FaListAlt className="text-indigo-500 text-xl" />
                <h2 className="text-lg font-semibold text-gray-800">Details</h2>
              </div>
              <div className="rounded-2xl border border-indigo-100 shadow-sm bg-white/80 p-6">
                <SpotDetails 
                  formData={formData} 
                  onInputChange={handleInputChange} 
                />
              </div>
            </div>

            <div className="mb-2">
              <div className="flex items-center gap-2 mb-4">
                <FaImages className="text-indigo-500 text-xl" />
                <h2 className="text-lg font-semibold text-gray-800">Images</h2>
              </div>
              <div className="rounded-2xl border border-indigo-100 shadow-sm bg-white/80 p-6">
                <SpotImages 
                  formData={formData} 
                  onInputChange={handleInputChange} 
                />
              </div>
              <div className="flex gap-4 pt-6 border-t border-indigo-100 bg-white sticky bottom-0 z-30 py-6 px-2 rounded-b-3xl shadow-2xl">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              label="Cancel"
            >
              
            </Button>
            <Button
              type="submit"
              form="add-spot-form"
              disabled={!isFormValid() || isSubmitting}
              label="Create Spot"
            > 
              {isSubmitting ? 'Creating...' : 'Create Spot'}
            </Button>
          </div>
            </div>
            
          </form>
         
          
        </div>
      </div>
    </div>
  );
};

export default AddSpotForm;