import React from "react";
import { connect } from "react-redux";
import "./Home.css";
import FeaturedTour from "../../Components/FeaturedTour/FeaturedTour";
import { Link } from "react-router-dom";
import BookNow from "../../Components/BookNow/BookNow";
import Testimonial from "../../Components/Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      <div className="home">
        <main className="home-container">
          <section>
            <h3> Welcome to Trexplore</h3>
            <h1>
              Do come & visit <span className="change_content"></span>
            </h1>
            <p>"Embark on Unforgettable Journeys"</p>
            <Link to="/AllTour" className="btone">
              Upcoming events
            </Link>
          </section>
        </main>
      </div>
      <FeaturedTour />
      <Testimonial />
      <BookNow />
    </>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(Home);
