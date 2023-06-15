import React, { useEffect } from "react";
import './singletour.css'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTours } from "../../Redux/Tour/toursAction";
import BookNow from "./../../Components/BookNow/BookNow";
import AboutTour from '../../Components/AboutTour/AboutTour'
import ImageTour from '../../Components/ImageTour/ImageTour'
import ReviewTour from "../../Components/ReviewTour/ReviewTour";
import { TailSpin } from 'react-loader-spinner';
import MapTour from "../../Components/MapTour/MapTour";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, loading } = useSelector((state) => state.tour);
  // const { name, duration, startLocation } = tour
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleTours(id));
  }, [dispatch, id]);

  console.log(tour.locations)
  return (
    <>
      {loading ?
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /> :
        <>
          <div className="single-tour-header">
            <h3 className="">{tour && tour.name}</h3>
            <p>{tour && tour.duration} days</p>
          </div>
          <AboutTour tour={tour} />
          <ReviewTour id={tour.id} />
          <ImageTour />
          <div className="container">

            <MapTour locations={tour.locations} />
          </div>
          <BookNow />
        </>

      }
    </>
  );
};

export default SingleTour;
