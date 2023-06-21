const express = require('express');
const authController = require('./../Controller/authController');
const bookingController = require('./../Controller/bookingController');

const router = express.Router();
router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getChekoutSession
);
// router.get(
//   '/create/:tourId/:userId/:price',
//   authController.protect,
//   bookingController.createBookingCheckout
// );

module.exports = router;
