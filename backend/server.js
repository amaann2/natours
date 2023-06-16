const connectionToDatabase = require('./db/db');

//* Handle uncaught exceptions

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION !! server closing down');
  console.log(err.name);
  console.log(err.message);
  process.exit(1);
});

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

//* Establish database connection

connectionToDatabase();

//*  start the server


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is Running on port ${port} 👌`);
});

//* Handled UnhandledRejection

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION !! server closing down');

  console.log(err.name);
  console.log(err.message);

  server.close(() => {
    process.exit(1);
  });
});
