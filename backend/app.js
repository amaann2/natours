const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
const reveiwRouter = require('./Routes/reviewRoutes');
const bookingRouter = require('./Routes/bookingRoutes');
const appError = require('./utils/appError');
const globalErrorHandler = require('./Controller/globalErrorController');
const cookieParser = require('cookie-parser');
const path = require('path');
const { webHooks } = require('./Controller/stripe');
const app = express();

//? parsing cookies from incoming requests
app.use(cookieParser());

//? CORS is a mechanism that allows a server to specify who can access its resources.

app.use(
  cors({
    // origin: `http://localhost:3000`,
    // methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    credentials: true,
  })
);

app.options('*', cors());

//? Set security Htpps headerss
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

//? Developement Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//? Limit request from same IP

const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: ' Too many Requests from this IP, please try again in an hour !',
});

app.use('/api', limiter);

app.post('/webhook', express.raw({ type: 'application/json' }), webHooks);

//? body-parser , reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

//? Data sanitization against nosql query injection
app.use(mongoSanitize());

//? Data sanitization against XSS - cross-site scripting

app.use(xss());

//? Prevent parameter pollution

app.use(
  hpp({
    whitelist: [
      'duration',
      'difficulty',
      'ratingAverage',
      'ratingQuantity',
      'price',
      'maxGroupSize',
    ],
  })
);

//? Serving the static file

app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'build')));

//? routing
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reveiwRouter);
//? unhandled route

// app.all('*', (req, res, next) => {
//   next(new appError(`can't find ${req.originalUrl} on this server`, 404));
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//? Globar error

app.use(globalErrorHandler);

module.exports = app;
