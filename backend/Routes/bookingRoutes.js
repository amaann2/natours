const express = require('express');
const authController = require('./../Controller/authController');
const bookingController = require('./../Controller/bookingController');

const router = express.Router();
router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getChekoutSession
);

module.exports = router;
