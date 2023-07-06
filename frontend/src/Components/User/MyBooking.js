import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserBooking } from "../../Redux/Booking/bookingAction";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import TourCard from "./../TourCard/TourCard";
import { Link } from "react-router-dom";
const MyBooking = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { booking, loading, error } = useSelector((state) => state.booking);
  console.log(booking);
  useEffect(() => {
    dispatch(getUserBooking(currentUser?._id));
    if (error) {
      toast.error(error);
    }
  }, [dispatch, currentUser, error]);
  return (
    <>
      <h3 className="booking-heading">My Book Tour</h3>
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
      ) : booking <= 0 ? (
        <h3 className="booking-heading">No Booked Tour !!<Link to={'/alltour'}>Upcoming  event</Link></h3>
      ) : (
        booking.map((order) => (
          <>
            <TourCard data={order?.tour} />
          </>
        ))
      )}
    </>
  );
};

export default MyBooking;
