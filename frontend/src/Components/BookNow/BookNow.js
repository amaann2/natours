import React from "react";
import "./booknow.css";
import axios from "axios";
// import Stripe from "stripe";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";
const stripe = await loadStripe(
  "pk_test_51MeJt3SJ6p54l9omPgb5AncZiaSDLWeAo2fHshhtiQQtFEsMnrwtBaclaywkiNnJeRzSJaHlIWahDqkqz2q6Y9YN00C9HVhIbt"
);

axios.defaults.withCredentials = true;

const BookNow = () => {
  const { tour } = useSelector((state) => state.tour);
  const { isAuthenticated } = useSelector((state) => state.user);

  const bookTour = async () => {
    try {
      const res = await axios.get(
        `/api/v1/bookings/checkout-session/${tour.id}`,
        { withCredentials: true }
      );
      if (res.data.id) {
        await stripe.redirectToCheckout({
          sessionId: res.data.id,
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }

  };
  return (
    <div className="book-now">
      <div className="container" id="book-now">
        <div className="row">
          <div className="col-2">
            <h3 className="book-now-heading">
              Embark on Your Next Adventure! Book Now and Create Memories That
              Last a Lifetime.
            </h3>
          </div>
          <div className="col-2">
            {isAuthenticated ? (
              <button className="btn-book-now" onClick={bookTour}>
                Book now
              </button>
            ) : (
              <button className="btn-book-now">
                <Link to={"/login"}>Login Now to book</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
