import React from "react";
import img1 from "./../../assets/378016.jpg";
const ImageTour = () => {
  return (
    <div style={{ margin: "100px 10px" }}>
      <div className="container ">
        <div className="row">
          <div className="col-3">
            <img src={img1} alt="" />
          </div>
          <div className="col-3">
            <img src={img1} alt="" />
          </div>
          <div className="col-3">
            <img src={img1} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageTour;
