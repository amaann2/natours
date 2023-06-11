const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require('./../Controller/userController');
const {
  signup,
  login,
  resetPassword,
  forgortPassword,
  protect,
  updatePassword,
  restrictTo,
} = require('./../Controller/authController');

const router = express.Router();

// authentication
router.post('/signup', signup);
router.post('/login', login);
// password reset functionality
router.post('/forgotPassword', forgortPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect);
router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);
router.get('/getMe', getMe, getUser);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
