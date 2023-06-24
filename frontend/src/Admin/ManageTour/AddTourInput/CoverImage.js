import React from "react";

const CoverImage = ({ onFileChange }) => {
  return (
    <>
      <h4>Tour Cover Image</h4>
      <hr />
      <input type="file" onChange={onFileChange} required />
    </>
  );
};

export default CoverImage;
