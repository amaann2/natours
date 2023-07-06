const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../Model/bookingModel');
const catchAsync = require('../utils/catchAsync');
const User = require('../Model/userModel');
exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  const { tour } = req.body;
  const { currentUser } = req.body;
  const session = await stripe.checkout.sessions.create({
    phone_number_collection: {
      enabled: true,
    },
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: tour.name,
            description: tour.summary,
            images: [
              `http://localhost:${process.env.PORT}/img/tours/${tour.imageCover}`,
            ],
          },
          unit_amount: tour.price,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    client_reference_id: tour._id,
    customer_email: currentUser.email,
    success_url: `${process.env.FRONTEND_HOST}/success`,
    cancel_url: `${process.env.FRONTEND_HOST}/tour/${tour.id}`,
    payment_method_types: ['card'],
  });
  res.status(200).json({
    status: 'success',
    url: session.url,
  });
});

const createBookingCheckout = async (session) => {
  const tour = session.client_reference_id;
  const user = await User.findOne({ email: session.customer_email });
  const price = session.amount_total;
  await Booking.create({ tour, user, price });
};
exports.webHooks = (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_ENDPOINT_SECRET
    );
    console.log('webhook verified');
  } catch (err) {
    console.log(`Webhook Error : ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    createBookingCheckout(event.data.object);
  }

  res.status(200).json({ recieve: true });
};

// stripe listen --forward-to localhost:8000/webhook
