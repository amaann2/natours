import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleTours } from '../../Redux/Tour/toursAction';
const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour } = useSelector((state) => state.tour);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getSingleTours(id));
  }, [dispatch, id]);
  return <div>SingleTour {tour.name}</div>;
};

export default SingleTour;
