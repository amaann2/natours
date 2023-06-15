import React, { useEffect } from "react";
import TourCard from "../../Components/TourCard/TourCard";
import "./AllTour.css";
import { getTours } from "../../Redux/Tour/toursAction";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
const AllTours = () => {
  const dispatch = useDispatch();
  const { tours, loading, error } = useSelector((state) => state.tours);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
      });
    }
    dispatch(getTours());
  }, [dispatch, error]);
  return (
    <div className="container">
      <div className="row">
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
          tours &&
          tours.map((data) => (
            <TourCard key={data._id} data={data} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllTours;
