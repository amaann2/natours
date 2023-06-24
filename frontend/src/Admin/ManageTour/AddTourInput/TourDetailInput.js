import React from "react";

const TourDetailInput = ({ inputData, handleChange }) => {
  return (
    <>
      <h4>Tour Detail</h4>
      <hr />
      <input
        type="text"
        name="name"
        value={inputData.name}
        placeholder="Name"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="summary"
        value={inputData.summary}
        placeholder="Summary"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={inputData.description}
        placeholder="Description"
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        value={inputData.price}
        placeholder="Price"
        required
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxGroupSize"
        value={inputData.maxGroupSize}
        placeholder="maxGroupSize"
        required
        onChange={handleChange}
      />
      <input
        type="number"
        name="duration"
        value={inputData.duration}
        placeholder="duration"
        required
        onChange={handleChange}
      />
      <select name="difficulty" onChange={handleChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium </option>
        <option value="difficult">Difficult </option>
      </select>

      <input
        type="date"
        name="startDates"
        placeholder="start dates"
        required
        value={inputData.startDates}
        onChange={handleChange}
      />
    </>
  );
};

export default TourDetailInput;
