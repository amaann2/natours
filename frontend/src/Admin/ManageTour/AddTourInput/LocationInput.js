import React, { useState } from "react";

const LocationInput = ({ locations, setLoactions }) => {
  const [locationInputData, setLocationInputData] = useState({
    coordinates: [],
    address: "",
    description: "",
    day: "",
  });
  const handleChangeLocation = (e) => {
    const { name, value } = e.target;

    if (name === "coordinates") {
      const index = Number(e.target.dataset.index);
      const updatedCoordinates = [...locationInputData.coordinates];
      updatedCoordinates[index] = Number(value);

      setLocationInputData({
        ...locationInputData,
        coordinates: updatedCoordinates,
      });
    } else {
      setLocationInputData({
        ...locationInputData,
        [name]: value,
      });
    }
  };
  const handleLocationClick = () => {
    const coordinates = locationInputData.coordinates.map((str) => {
      return parseFloat(str, 10);
    });

    // Create a new location object with the converted coordinates
    const newLocation = {
      coordinates,
      address: locationInputData.address,
      description: locationInputData.description,
      day: locationInputData.day,
    };
    console.log(newLocation);

    setLoactions((prevLocations) => [...prevLocations, newLocation]);
  };

  return (
    <>
      <h4>Tour All Location -- (many)</h4>
      <hr />
      <input
        type="number"
        name="coordinates"
        placeholder="coordinates (latitude)"
        value={locationInputData.coordinates[0] || ""}
        data-index={0}
        onChange={handleChangeLocation}
      />
      <input
        type="number"
        name="coordinates"
        placeholder="coordinates (longitude)"
        value={locationInputData.coordinates[1] || ""}
        data-index={1}
        onChange={handleChangeLocation}
      />
      <input
        type="text"
        name="description"
        placeholder="description"
        value={locationInputData.description}
        onChange={handleChangeLocation}
      />
      <input
        type="text"
        name="address"
        placeholder="address"
        value={locationInputData.address}
        onChange={handleChangeLocation}
      />
      <input
        type="number"
        name="day"
        placeholder="day"
        value={locationInputData.day}
        onChange={handleChangeLocation}
      />{" "}
      <br />
      <button onClick={handleLocationClick} name="addButton">
        add
      </button>
      {locations && locations.map((loc) => <h1>{loc.address}</h1>)}
    </>
  );
};

export default LocationInput;
