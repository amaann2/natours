import React from "react";
const ImageTour = ({ image }) => {
  return (
    <div style={{ margin: "100px 10px" }}>
      <div className="container ">
        <div className="row" data-aos="flip-left">
          {image &&
            image.map((url, index) => (
              <div className="col-3" key={index}>
                <img
                  crossOrigin="anonymous"
                  src={`http://localhost:8000/img/tours/${url}`}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageTour;
