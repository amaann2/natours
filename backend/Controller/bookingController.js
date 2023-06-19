const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utils/catchAsync');
const Tour = require('./../Model/tourModel');
exports.getChekoutSession = catchAsync(async (req, res) => {
  // TODO : get the currently booked tour

  const tour = await Tour.findById(req.params.tourId);
  console.log(tour.imageCover);
  const image = `http://localhost:8000/img/tours/${tour.imageCover}`;
  console.log(image);
  // TODO : create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${process.env.FRONTEND_HOST}/success`,
    cancel_url: `${process.env.FRONTEND_HOST}/tour/${tour.id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'inr',
          unit_amount: tour.price,
          product_data: {
            name: `${tour.name}`,
            description: tour.summary,
            images: [
              `http://localhost:${process.env.PORT}/img/tours/${tour.imageCover}`,
            ],
          },
        },
        quantity: 1,
      },
    ],
  });
  // TODO : create session as response

  res.status(200).json({
    status: 'success',
    // url: session.url,
    id: session.id,
  });
});
