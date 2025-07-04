import '../../leaflet-fix';

// MapPicker.jsx restored as requested. If the original content is lost, please replace this placeholder with the correct implementation.

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMarker = ({ value, onChange }) => {
  const markerRef = useRef();

  useMapEvents({
    click(e) {
      onChange([e.latlng.lat, e.latlng.lng]);
    },
  });

  return value ? (
    <Marker
      position={value}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = markerRef.current || e.target;
          const latlng = marker.getLatLng();
          onChange([latlng.lat, latlng.lng]);
        },
      }}
      ref={markerRef}
    />
  ) : null;
};

const MapPicker = ({ value, onChange }) => {
  // Use My Location handler
  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onChange([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          alert('Could not get your location');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  // Clear marker
  const handleClear = () => {
    onChange([0, 0]);
  };

  useEffect(() => {
    // If value is [0,0], try to use geolocation on mount
    if (value && value[0] === 0 && value[1] === 0) {
      handleUseMyLocation();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <button
          type="button"
          onClick={handleUseMyLocation}
          style={{
            padding: '6px 12px',
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Use My Location
        </button>
        <button
          type="button"
          onClick={handleClear}
          style={{
            padding: '6px 12px',
            background: '#e5e7eb',
            color: '#374151',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Clear Marker
        </button>
        {value && value[0] !== 0 && value[1] !== 0 && (
          <span style={{ fontSize: 13, color: '#6366f1', marginLeft: 8 }}>
            Lat: {value[0].toFixed(5)}, Lng: {value[1].toFixed(5)}
          </span>
        )}
      </div>
      <div style={{ width: '100%', aspectRatio: '3/2', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px #0001', marginBottom: 8 }}>
        <MapContainer
          center={value && value[0] !== 0 ? value : [20, 77]}
          zoom={value && value[0] !== 0 ? 13 : 5}
          style={{ width: '100%', height: '100%' }}
          className="add-spot-map-container"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker value={value} onChange={onChange} />
        </MapContainer>
      </div>
      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>
        Click on the map or drag the marker to set the spot location. Use "Use My Location" for quick access.
      </div>
      {value && value[0] === 0 && value[1] === 0 && (
        <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 4 }}>
          Please pick a location on the map or use "Use My Location".
        </div>
      )}
    </div>
  );
};

export default MapPicker; 