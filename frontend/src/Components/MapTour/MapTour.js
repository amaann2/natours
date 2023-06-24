import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import "./maptour.css";
const MapTour = ({ locations }) => {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={4}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations &&
        locations.map((location) => {
          let position;
          if (location.coordinates.length === 1) {
            const [latitude, longitude] = location.coordinates[0].split(",");
            position = [parseFloat(latitude), parseFloat(longitude)];
          } else {
            position = [location.coordinates[1], location.coordinates[0]];
          }

          return (
            <Marker key={location._id} position={position}>
              <Tooltip>
                Day {location.day} : {location.description}
              </Tooltip>
              <Popup>
                <h3>Day: {location.day}</h3>
                <p>{location.description}</p>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  );
};

export default MapTour;
