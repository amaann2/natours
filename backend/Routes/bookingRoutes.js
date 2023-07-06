const express = require('express');
const authController = require('./../Controller/authController');
const bookingController = require('./../Controller/bookingController');
const stripe = require('./../Controller/stripe');

const router = express.Router();

router.use(authController.protect);

router.post('/create-checkout-session', stripe.createCheckoutSession);

router
  .route('/')
  .get(bookingController.getAllBooking)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
