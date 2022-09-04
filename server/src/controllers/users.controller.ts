import bcrypt from 'bcrypt';

import asyncHandler from '../middlewares/asyncHandler';
import User from '../models/user.model';
import ErrorResponse from '../utils/ErrorResponse';
import { generateAuthToken } from '../utils/utils';

/**
 * @route    POST api/users/register
 * @desc     Create a new user in the users collection
 * @access   Private
 */
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  var salt = await bcrypt.genSalt(10);
  var hash = await bcrypt.hash(password, salt);
  const newUser = await User.create({ name, email, password: hash });
  const token = generateAuthToken(newUser);

  res.status(201).json({
    success: true,
    data: {
      _id: newUser._id,
      name,
      email,
      token,
    },
  });
});

/**
 * @route    POST api/users/login
 * @desc     Login the user
 * @access   Private
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const selectedUser = await User.findOne({ email });

  if (!selectedUser) {
    return next(new ErrorResponse(`User with '${email}' not found`, 401));
  }

  if (!await bcrypt.compare(password, selectedUser.password)) {
    return next(new ErrorResponse('Password not match', 401));
  }

  const token = generateAuthToken(selectedUser);

  res.status(200).json({
    success: true,
    data: {
      _id: selectedUser._id,
      name: selectedUser.name,
      email,
      token,
    },
  });
});
