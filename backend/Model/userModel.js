//? importing required modules

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

//? Creating a new Mongoose schema for the User model

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, ' Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'A User must have a password'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'A User must have a confirm password'],
    validate: {
      //! This is only works only on create and  save not on findone find etc
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are the not the same !',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//? Pre-save middleware to hash the password before saving the user to the database

userSchema.pre('save', async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with the cost 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the confirmPassword field
  this.confirmPassword = undefined;
  next();
});

//? Pre-save middleware to set the passwordChangedAt field if the password was modified

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//?  Pre-find middleware to exclude inactive users from query results

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

//? Instance method to check if a user changed their password after the issuance of a JSON Web Token (JWT)

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changeTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changeTimeStamp;
  }
  return false;
};

//? Instance method to check if a candidate password matches the user's password

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//? Instance method to generate a password reset token for the forgot password functionality

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
