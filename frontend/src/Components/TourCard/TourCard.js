import React from "react";
import "./TourCard.css";
import {
  MdLocationOn,
  MdOutlineCalendarToday,
  MdPeople,
  MdReviews,
} from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
const TourCard = ({ data }) => {
  const {
    id,
    name,
    summary,
    price,
    startLocation,
    maxGroupSize,
    rating,
    duration,
    difficulty,
    startDates,
    slug,
  } = data;
  const date = new Date(startDates[0]);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = date.getFullYear();
  const monthIndex = date.getMonth() + 1;
  const month = monthNames[monthIndex];
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-picture">
          <div className="card-picture-overlay"></div>
          <img
            className="card-picture-img"
            crossOrigin="anonymous"
            src={`http://localhost:8000/img/tours/${data.imageCover}`}
            alt={data.imageCover}
          />
        </div>
        <h3 className="card-name">
          <span>{name}</span>
        </h3>
      </div>

      <div className="card-details">
        <h4 className="card_sub-heading">
          {difficulty} {duration}-day tour
        </h4>
        <p className="card-text">{summary}</p>
        <div className="card-data">
          <MdLocationOn className="card-icon" /> {startLocation.description}
        </div>
        <div className="card-data">
          <MdOutlineCalendarToday className="card-icon" /> {month} {year}
        </div>
        <div className="card-data">
          <MdReviews className="card-icon" /> {rating} rating
        </div>
        <div className="card-data">
          <MdPeople className="card-icon" /> {maxGroupSize} people
        </div>
      </div>

      <div className="card-footer">
        <p>
          <span className="card_footer-value">
            <FaRupeeSign className="card-icon" />
            {price} per person
          </span>
        </p>

        <Link to={`/tour/${id}`} className="card-button">
          {" "}
          details
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
