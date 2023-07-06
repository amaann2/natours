import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const PayButton = ({ tour }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/bookings/create-checkout-session", {
        withCredentials: true,
        tour,
        currentUser,
      });
      if (res.data.url) {
        setLoading(false);
        window.location.href = res.data.url;
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <button onClick={handleCheckout} className="btn-book-now">
        {loading ? (
          <div className="spinner-container">
            <TailSpin
              height="30"
              width="30"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              visible={true}
            />
          </div>
        ) : (
          "Buy Now"
        )}
      </button>
    </>
  );
};

export default PayButton;
