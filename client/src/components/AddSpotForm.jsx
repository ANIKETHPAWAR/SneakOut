import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SpotBasicInfo from './AddSpot/SpotBasicInfo';
import SpotLocation from './AddSpot/SpotLocation';
import SpotDetails from './AddSpot/SpotDetails';
import SpotImages from './AddSpot/SpotImages';
import Button from './Button';

const AddSpotForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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

    try {
      const response = await fetch('/api/spots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create spot');
      }

      const newSpot = await response.json();
      navigate(`/spots/${newSpot._id}`);
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Spot</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <SpotBasicInfo 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
          
          <SpotLocation 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
          
          <SpotDetails 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
          
          <SpotImages 
            formData={formData} 
            onInputChange={handleInputChange} 
          />

          <div className="flex gap-4 pt-6 border-t">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Creating...' : 'Create Spot'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSpotForm;