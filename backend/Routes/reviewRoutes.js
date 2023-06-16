const express = require('express');
const {
  getAllReview,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../Controller/reviewController');
const { protect, restrictTo } = require('../Controller/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReview)
  .post(restrictTo('user'), protect, setTourUserIds, createReview);

router.use(protect);
router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

module.exports = router;
