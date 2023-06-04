const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require('./../Controller/userController');
const {
  signup,
  login,
  resetPassword,
  forgortPassword,
  protect,
  updatePassword,
} = require('./../Controller/authController');

const router = express.Router();

// authentication
router.post('/signup', signup);
router.post('/login', login);

// password reset functionality
router.post('/forgotPassword', forgortPassword);
router.patch('/resetPassword/:token', resetPassword);

router.patch('/updateMyPassword', protect, updatePassword);
router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

// user route
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
