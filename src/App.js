import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./App.css";

// Ensure the default marker icon is available
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const profiles = [
  {
    id: 1,
    name: "John Doe",
    photo: "https://via.placeholder.com/150",
    description: "Software Developer",
    address: "Seattle, WA",
    coordinates: [47.6062, -122.3321]
  },
  {
    id: 2,
    name: "Jacob Doe",
    photo: "https://via.placeholder.com/150",
    description: "Software Engineer",
    address: "Cupertino, CA",
    coordinates: [37.3230, -122.0322]
  },
  {
    id: 3,
    name: "Jane Smith",
    photo: "https://via.placeholder.com/150",
    description: "UX Designer",
    address: "New York, NY",
    coordinates: [40.7128, -74.0060]
  },
];

const ProfileCard = ({ profile, onSummary }) => {
  return (
    <div className="profile-card">
      <img src={profile.photo} alt={profile.name} className="profile-photo" />
      <div className="profile-info">
        <h2>{profile.name}</h2>
        <p className="description">{profile.description}</p>
        <p className="address">{profile.address}</p>
        <button onClick={() => onSummary(profile)} className="summary-button">
          Summary
        </button>
      </div>
    </div>
  );
};

function App() {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleSummary = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div className="app-container">
      <h1>Profile Explorer</h1>
      <div className="content-container">
        <div className="profile-list">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} onSummary={handleSummary} />
          ))}
        </div>
        <div className="map-container">
          <MapContainer center={[39.8283, -98.5795]} zoom={4} className="map">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {selectedProfile && (
              <Marker position={selectedProfile.coordinates}>
                <Popup>
                  <div>
                    <h3>{selectedProfile.name}</h3>
                    <p>{selectedProfile.address}</p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default App;