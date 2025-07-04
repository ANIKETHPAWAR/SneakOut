import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix leaflet's default icon path issues with Vite/React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const defaultCenter = [20.5937, 78.9629]; // [lat, lng] Center of India
const defaultZoom = 6;

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const { lat, lng } = e.target.getLatLng();
          setPosition([lat, lng]);
        },
      }}
    >
      <Popup>
        <span style={{ fontWeight: 500 }}>Selected Location</span>
        <br />
        <span style={{ fontSize: "0.95em" }}>
          Lat: {position[0].toFixed(6)},<br />Lng: {position[1].toFixed(6)}
        </span>
      </Popup>
    </Marker>
  ) : null;
}

const OlaMap = ({ value, onChange }) => {
  const [position, setPosition] = useState(value || defaultCenter);
  const mapRef = useRef();

  // Update parent when marker moves
  useEffect(() => {
    if (onChange) onChange(position);
    // eslint-disable-next-line
  }, [position]);

  // Geolocation
  const handleGeolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          if (mapRef.current) {
            mapRef.current.setView([pos.coords.latitude, pos.coords.longitude], 12);
          }
        },
        () => {
          alert("Could not get your location.");
        }
      );
    } else {
      alert("Geolocation not supported.");
    }
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.07)",
      border: "1px solid #e5e7eb",
      padding: "1.5rem 1.5rem 1rem 1.5rem",
      marginBottom: "1.5rem",
      overflowX: "hidden"
    }}>
      <MapContainer
        center={position}
        zoom={defaultZoom}
        style={{ width: "100%", maxWidth: "100%", height: "350px", borderRadius: "12px", marginTop: "0.5rem", marginBottom: "1rem", boxShadow: "0 1px 6px 0 rgba(0,0,0,0.06)", overflow: "hidden" }}
        scrollWheelZoom={true}
        whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      <button
        type="button"
        onClick={handleGeolocate}
        style={{
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          padding: "10px 24px",
          background: "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
          color: "#fff",
          fontWeight: 600,
          fontSize: "1rem",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 1px 4px 0 rgba(37,99,235,0.10)",
          cursor: "pointer",
          transition: "background 0.2s"
        }}
        onMouseOver={e => e.currentTarget.style.background = '#1e40af'}
        onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)'}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5em" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 2a1 1 0 0 1 1 1v1.07A8.001 8.001 0 0 1 20.93 11H22a1 1 0 1 1 0 2h-1.07A8.001 8.001 0 0 1 13 20.93V22a1 1 0 1 1-2 0v-1.07A8.001 8.001 0 0 1 3.07 13H2a1 1 0 1 1 0-2h1.07A8.001 8.001 0 0 1 11 3.07V2a1 1 0 0 1 1-1Zm0 4a6 6 0 1 0 0 12A6 6 0 0 0 12 6Z"/></svg>
          Use My Location
        </span>
      </button>
      <div style={{ marginTop: "12px", fontSize: "1.05em", color: "#1e293b" }}>
        <b>Selected Coordinates:</b> <span style={{ fontFamily: "monospace" }}>Latitude: {position[0].toFixed(6)}, Longitude: {position[1].toFixed(6)}</span>
      </div>
    </div>
  );
};

export default OlaMap; 