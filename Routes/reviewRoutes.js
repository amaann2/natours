const express = require('express');
const {
  getAllReview,
  createReview,
} = require('../Controller/reviewController');
const { protect, restrictTo } = require('../Controller/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllReview)
  .post(protect, restrictTo('user'), createReview);
module.exports = router;
