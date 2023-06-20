import React, { useEffect } from "react";
import "./reviewtour.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import Stars from "../Stars/Stars";
import "swiper/css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getReview } from "../../Redux/Review/reviewAction";
import { TailSpin } from "react-loader-spinner";

const ReviewTour = ({ id }) => {
  const dispatch = useDispatch();
  const { review, loading } = useSelector((state) => state.review);
  useEffect(() => {
    dispatch(getReview(id));
  }, [id, dispatch]);

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
        autoplay={{
          delay: 4000,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {loading ? (
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          review &&
          review.map((data, index) => (
            <SwiperSlide key={data._id}>
              <div className="review-box">
                <img
                  // crossOrigin="anonymous"
                  src={`/img/users/${data.user.photo}`}
                  alt="profileimage"
                />
                <h3>{data.user && data.user.name}</h3>
                <p>{data.review}</p>
                <Stars rating={data.rating} />
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default ReviewTour;
