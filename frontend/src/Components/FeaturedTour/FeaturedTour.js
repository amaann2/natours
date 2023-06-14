import React, { useEffect } from 'react';
import './FeaturedTour.css';
import TourCard from './../TourCard/TourCard';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getTours } from '../../Redux/Tour/toursAction';
import { toast } from 'react-toastify';
const FeaturedTour = () => {
  const dispatch = useDispatch();
  const { tours, error } = useSelector((state) => state.tours);
  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getTours());
  }, [dispatch, error]);

  const renderTourCards = () => {
    return tours.slice(0, 3).map((data) => (
      <div className="col-3" key={data._id}>
        <TourCard data={data} />
      </div>
    ));
  };
  return (
    <div className="container">
      <h2 className='container-heading'>Featured Tour</h2>
      <div className="row">{renderTourCards()}</div>
    </div>
  );
};

export default FeaturedTour;
