import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import FeaturedTour from '../../Components/FeaturedTour/FeaturedTour';
import { Link } from 'react-router-dom';
import BookNow from '../../Components/BookNow/BookNow';
import Testimonial from '../../Components/Testimonial/Testimonial';

axios.defaults.withCredentials = true;

const Home = ({ currentUser }) => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8000/api/v1/users/getMe',
          { withCredentials: true }
        );
        setProfile(res.data.data.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    getProfile();
  }, []);
  console.log(profile);

  return (
    <>
      <div className="home">
        <main className="home-container">
          <section>
            <h3> Welcome to Trexplore</h3>
            <h1>
              Do come & visit <span class="change_content"></span>
            </h1>
            <p>"Embark on Unforgettable Journeys"</p>
            <Link to="/AllTour" class="btone">
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
