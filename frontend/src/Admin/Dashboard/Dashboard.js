import React, { useEffect } from "react";
import "./Dashboard.css";
import { AiOutlineUser } from "react-icons/ai";
import { MdRateReview } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { SiVirustotal } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Redux/User/userAction";
import { getAllBooking } from "../../Redux/Booking/bookingAction";
import { getAllReview } from "../../Redux/Review/reviewAction";
import { getTours } from "../../Redux/Tour/toursAction";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { users } = useSelector((state) => state.getUser);
  const { tours } = useSelector((state) => state.tours);
  const { booking } = useSelector((state) => state.booking);
  const { review } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTours());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllBooking());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllReview());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="row">
        <div className=" box">
          <div className="detail">
            <Link to={"/admin/user"}>
              <AiOutlineUser className="dashboard-icon" />
              <h3>Users</h3>
              <h3>{users && users.length}</h3>
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="detail">
            <Link to={"/admin/tour"}>
              <SiVirustotal className="dashboard-icon" />
              <h3>Tours</h3>
              <h3>{tours && tours.length}</h3>
            </Link>
          </div>
        </div>

        <div className=" box">
          <div className="detail">
            <Link to={"/admin/booking"}>
              <TbBrandBooking className="dashboard-icon" />
              <h3>Bookings</h3>
              <h3>{booking && booking.length}</h3>
            </Link>
          </div>
        </div>

        <div className=" box">
          <div className="detail">
            <Link to={"/admin/review"}>
              <MdRateReview className="dashboard-icon" />
              <h3>Reviews</h3>
              <h3>{review && review.length}</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
