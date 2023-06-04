const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('../../Model/tourModel');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Database is connected succusefull at mongodb atlas 😊');
  });
const tour = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

//import the data
const importData = async () => {
  try {
    await Tour.create(tour);
    console.log('data added successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//delete the data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data deleted successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
