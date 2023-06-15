import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import "./maptour.css";
const MapTour = ({ locations }) => {
  return (
    <MapContainer
      center={[51.417611, -116.214531]} // Set the initial center of the map
      zoom={8} // Set the initial zoom level
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />{" "}
      {/* Map through the locations array and create a Marker for each location */}
      {locations &&
        locations.map((location) => (
          <Marker
            key={location._id}
            position={[location.coordinates[1], location.coordinates[0]]}
          >
            {/* Display the location description as a tooltip */}
            <Tooltip>
              Day {location.day} : {location.description}
            </Tooltip>
            <Popup>
              <h3>Day: {location.day}</h3>
              <p>{location.description}</p>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapTour;
