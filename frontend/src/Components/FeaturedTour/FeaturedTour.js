import React, { useEffect } from "react";
import "./FeaturedTour.css";
import TourCard from "./../TourCard/TourCard";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getTopThreeCheapTour } from "../../Redux/Tour/toursAction";
import { toast } from "react-toastify";
const FeaturedTour = () => {
  const dispatch = useDispatch();
  const { topTour, error } = useSelector((state) => state.toptour);
  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getTopThreeCheapTour());
  }, [dispatch, error]);
  return (
    <div className="container">
      <h2 className="container-heading">Top 3 Cheap Tour</h2>
      <div className="row">
        {topTour &&
          topTour.map((data) => (
            <div className="col-3" key={data._id}>
              <TourCard data={data} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedTour;
