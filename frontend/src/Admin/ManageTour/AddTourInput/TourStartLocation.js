import React, { useState } from "react";

const TourStartLocation = () => {
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

  console.log(locationInputData);

  return (
    <>
      <h4>Tour Start Location -- (one)</h4>
      <hr />
      <input
        type="number"
        name="coordinates"
        placeholder="coordinates"
        value={locationInputData.coordinates[0] || ""}
        data-index={0}
        onChange={handleChangeLocation}
      />
      <input
        type="number"
        name="coordinates"
        placeholder="coordinates"
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
      />
    </>
  );
};

export default TourStartLocation;
