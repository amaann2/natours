import React, { useEffect } from "react";
import "./singletour.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTours } from "../../Redux/Tour/toursAction";
import BookNow from "./../../Components/BookNow/BookNow";
import AboutTour from "../../Components/AboutTour/AboutTour";
import ImageTour from "../../Components/ImageTour/ImageTour";
import ReviewTour from "../../Components/ReviewTour/ReviewTour";
import { TailSpin } from "react-loader-spinner";
import MapTour from "../../Components/MapTour/MapTour";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, loading } = useSelector((state) => state.tour);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleTours(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <>
          <div
            className="single-tour-header"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/img/tours/${tour.imageCover})`,
            }}
          >
            <h3>{tour && tour.name}</h3>
            <p>{tour && tour.duration} days</p>
          </div>
          <AboutTour tour={tour} />
          <ReviewTour id={tour.id} />
          <ImageTour image={tour.images} />
          <div className="container" data-aos="zoom-out-up">
            <MapTour locations={tour.locations} />
          </div>
          <BookNow />
        </>
      )}
    </>
  );
};

export default SingleTour;
