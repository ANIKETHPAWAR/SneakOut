import React from 'react';
import InputBox from '../inputBox';
import MapPicker from './MapPicker';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBs3PZU1o8wWdATHgGdmupT5VwfpW6EE4M';

const SpotLocation = ({ formData, onInputChange }) => {
  const handleMapChange = (coords) => {
    onInputChange('location.coordinates', coords);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <InputBox
              label="Address"
              placeholder="Enter the full address"
              value={formData.location.address}
              onChange={(e) => onInputChange('location.address', e.target.value)}
              required
            />
          </div>

          <InputBox
            label="City"
            placeholder="Enter city name"
            value={formData.location.city}
            onChange={(e) => onInputChange('location.city', e.target.value)}
            required
          />

          <InputBox
            label="Country"
            placeholder="Enter country name"
            value={formData.location.country}
            onChange={(e) => onInputChange('location.country', e.target.value)}
            required
          />
        </div>
        <div className="mt-6">
          <MapPicker
            value={formData.location.coordinates}
            onChange={handleMapChange}
            apiKey={GOOGLE_MAPS_API_KEY}
          />
        </div>
      </div>
    </div>
  );
};

export default SpotLocation; 