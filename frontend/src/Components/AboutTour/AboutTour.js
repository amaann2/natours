import React from "react";
import "./abouttour.css";
import {
  MdPeople,
  MdOutlineCalendarToday,
  MdReviews,
  MdLocationOn,
} from "react-icons/md";
const AboutTour = ({ tour }) => {
  const { name, description, maxGroupSize, rating, guides } = tour;

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
  const date = new Date(tour.startDates && tour.startDates[0]);
  const year = date.getFullYear();
  const monthIndex = date.getMonth() + 1;
  const month = monthNames[monthIndex];
  return (
    <div className="about-tour">
      <div className="container">
        <div className="row">
          <div className="col-2 left">
            <h3>quick facts</h3>
            <ul>
              <li>
                <MdOutlineCalendarToday className="card-icon" />
                <span>Next Date</span>
                {month} {year}
              </li>
              <li>
                <MdLocationOn className="card-icon" /> <span>Difficulty</span>{" "}
                {tour.difficulty}
              </li>
              <li>
                <MdPeople className="card-icon" /> <span>participants</span>{" "}
                {maxGroupSize}
              </li>
              <li>
                <MdReviews className="card-icon" /> <span>rating</span>
                {rating} / 5
              </li>
            </ul>
            <h3>your tour guide</h3>
            <ul>
              {guides &&
                guides.map((guide, i) => (
                  <li key={i}>
                    <span>{guide.role}</span> {guide.name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-2 right">
            <h3>About the {name}</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTour;
