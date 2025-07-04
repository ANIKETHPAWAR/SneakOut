import React from 'react';
import { X, MapPin, Star, Clock, User, Tag } from 'lucide-react';
import { getCategoryColor, getDifficultyColor } from '../utils/colors';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../leaflet-fix';

const SpotDetailModal = ({ spot, isOpen, onClose }) => {
  if (!isOpen || !spot) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/40">
        {/* Header */}
        <div className="relative">
          <div className="h-64 bg-gradient-to-br from-purple-400 to-blue-500 relative rounded-t-2xl">
            {spot.images && spot.images.length > 0 ? (
              <img 
                src={spot.images[0].url} 
                alt={spot.name}
                className="w-full h-full object-cover rounded-t-2xl"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <MapPin className="w-16 h-16 text-white opacity-50" />
              </div>
            )}
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(spot.category)}`}>
                {spot.category}
              </span>
            </div>
            {/* Rating */}
            {spot.rating && spot.rating.average > 0 && (
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{spot.rating.average.toFixed(1)}</span>
                <span className="text-xs text-gray-500">({spot.rating.count})</span>
              </div>
            )}
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-16 p-2 rounded-full bg-white bg-opacity-90 hover:bg-white transition-colors shadow"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{spot.name}</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{spot.description}</p>
          {/* Location Details */}
          <div className="bg-gray-50/70 backdrop-blur rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Location Details
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700"><span className="font-medium">Address:</span> {spot.location.address}</p>
              <p className="text-gray-700"><span className="font-medium">City:</span> {spot.location.city}</p>
              <p className="text-gray-700"><span className="font-medium">Country:</span> {spot.location.country}</p>
              <p className="text-gray-700">
                <span className="font-medium">Coordinates:</span> {spot.location.coordinates[1].toFixed(4)}, {spot.location.coordinates[0].toFixed(4)}
              </p>
            </div>
            {/* Spot Location Map */}
            {spot.location.coordinates && spot.location.coordinates[0] !== 0 && spot.location.coordinates[1] !== 0 && (
              <div style={{ width: '100%', height: 200, borderRadius: 12, overflow: 'hidden', marginTop: 12, boxShadow: '0 2px 8px #0001' }}>
                <MapContainer
                  center={[spot.location.coordinates[1], spot.location.coordinates[0]]}
                  zoom={13}
                  style={{ width: '100%', height: '100%' }}
                  dragging={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                  touchZoom={false}
                  keyboard={false}
                  zoomControl={false}
                  attributionControl={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[spot.location.coordinates[1], spot.location.coordinates[0]]} />
                </MapContainer>
              </div>
            )}
          </div>
          {/* Tags */}
          {spot.tags && spot.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Tag className="w-5 h-5 text-purple-600" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {spot.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Difficulty:</span>
              <span className={`font-medium ${getDifficultyColor(spot.difficulty)}`}>
                {spot.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Best Time:</span>
              <span className="font-medium text-gray-900">{spot.bestTime}</span>
            </div>
          </div>
          {/* Creator Info */}
          {spot.createdBy && (
            <div className="flex items-center gap-2 text-sm text-gray-600 pt-4 border-t border-gray-200">
              <User className="w-4 h-4" />
              <span>Added by {spot.createdBy.firstName} {spot.createdBy.lastName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotDetailModal; 