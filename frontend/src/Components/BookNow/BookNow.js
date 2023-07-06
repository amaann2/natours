import React from "react";
import "./booknow.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PayButton from "../PayButton/PayButton";


axios.defaults.withCredentials = true;

const BookNow = ({ button }) => {
  const { tour } = useSelector((state) => state.tour);
  const { isAuthenticated } = useSelector((state) => state.user);

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
              <PayButton tour={tour} />
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
