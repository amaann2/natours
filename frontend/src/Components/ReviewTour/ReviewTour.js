import React, { useEffect, useState } from "react";
import "./reviewtour.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import axios from "axios";
import user from "./../../assets/user-2.png";
import Stars from "../Stars/Stars";

import "swiper/css";
const ReviewTour = ({ id }) => {
  const [review, setReview] = useState([]);
  useEffect(() => {
    const getReview = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/tours/${id}/reviews`
        );
        setReview(res.data.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getReview();
  }, [id]);

  return (
    <div className="review">
      <Swiper
        navigation={true}
        grabCursor={true}
        spaceBetween={50}
        slidesPerView={1}
        breakpoints={{
          800: { slidesPerView: 3 },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {review &&
          review.map((data, index) => (
            <SwiperSlide>
              <div className="review-box" key={index}>
                <img src={user} alt="profileimage" />
                <h3>{data.user && data.user.name}</h3>
                <p>{data.review}</p>
                <Stars rating={data.rating} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ReviewTour;
