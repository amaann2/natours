const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('../../Model/tourModel');
const User = require('../../Model/userModel');
const Review = require('../../Model/reviewModel');
const connectionToDatabase = require('../../db/db');

const tour = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const user = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

//import the data
const importData = async () => {
  try {
    await connectionToDatabase();
    await Tour.create(tour);
    await User.create(user, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('data added successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//delete the data
const deleteData = async () => {
  try {
    await connectionToDatabase();
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
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
