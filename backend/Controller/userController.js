const Review = require('../Model/reviewModel');
const User = require('../Model/userModel');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactrory');
const multer = require('multer');
const sharp = require('sharp');

//? ------ Upload image using multer package-------------

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new appError('Not an image ! please upload a image', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});
//? ----- updated me as  a logged in user---------

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // TODO : create error if the user POSts password data
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new appError(
        'This route is not for password update please use /updateMyPasssword.',
        400
      )
    );
  }
  // TODO : Filtered out unwanted field that are not allowed to updated
  const filterBody = filterObj(req.body, 'name', 'email');
  if (req.file) filterBody.photo = req.file.filename;

  // TODO : update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

//? ---- delete me as a logged in user -------

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'Success',
    data: null,
  });
});

//? ----- get current user -----------
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

//? -----crud functioniality---------

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined! implement this route using signup',
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
// exports.updateUser = factory.updateOne(User); //! do not update password with this
exports.deleteUser = factory.deleteOne(User);

exports.updateUser = catchAsync(async (req, res, next) => {
  // TODO : create error if the admin want to update anything other than role of user
  if (req.body.password || req.body.name || req.body.email || req.body.photo) {
    return next(new appError('You can only update the role', 400));
  }
  const filterBody = filterObj(req.body, 'role');

  // TODO : update user document
  const updatedUser = await User.findByIdAndUpdate(req.params.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
