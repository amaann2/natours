import React from "react";

const ImagesInput = ({ setFirstImage, setSecondImage, setThirdImage }) => {
  return (
    <>
      <h4>Tour Images</h4>
      <hr />
      <input
        type="file"
        name="images"
        id=""
        placeholder="image Cover"
        onChange={(e) => setFirstImage(e.target.files[0])}
      />
      <input
        type="file"
        name="images"
        id=""
        placeholder="image Cover"
        onChange={(e) => setSecondImage(e.target.files[0])}
      />
      <input
        type="file"
        name="images"
        id=""
        placeholder="image Cover"
        onChange={(e) => setThirdImage(e.target.files[0])}
      />
    </>
  );
};

export default ImagesInput;
