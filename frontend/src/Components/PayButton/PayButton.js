import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const PayButton = ({ tour }) => {
  const { currentUser } = useSelector((state) => state.user);
  const handleCheckout = async () => {
    try {
      const res = await axios.post("/api/v1/bookings/create-checkout-session", {
        withCredentials: true,
        tour,
        currentUser,
      });
      console.log(res.data);
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={handleCheckout} className="btn-book-now">
        Buy Now
      </button>
    </>
  );
};

export default PayButton;
