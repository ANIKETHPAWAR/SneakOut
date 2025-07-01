import React from 'react';
import InputBox from '../inputBox';

const SpotLocation = ({ formData, onInputChange }) => {
  const handleCoordinateChange = (index, value) => {
    const newCoordinates = [...formData.location.coordinates];
    newCoordinates[index] = parseFloat(value) || 0;
    onInputChange('location.coordinates', newCoordinates);
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

          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Coordinates (Optional)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="e.g., -73.935242"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.location.coordinates[0]}
                  onChange={(e) => handleCoordinateChange(0, e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="e.g., 40.730610"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.location.coordinates[1]}
                  onChange={(e) => handleCoordinateChange(1, e.target.value)}
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              You can find coordinates using Google Maps or other mapping services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotLocation; 