const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../database/config/connection');
const userQueries = require('../database/queries');
const signUpSchema = require('../utils/validation/signUpSchema');
const loginSchema = require('../utils/validation/loginSchema');
const {createError} = require('../errors/customError');

const registerUser = async (req, res) => {
  const {username, password, confirm_password, email} = req.body;

  try {
    const {error} = await signUpSchema.validateAsync(req.body, {abortEarly: false});
  } catch (error) {
    throw createError(error.details.map(e => e.message).join(', '), 400);
  }

  // Check if username or email already exists
  const isExist = await connection.query(userQueries.userExist, [username, email]);

  if (isExist.rows[0]) {
    throw createError('Username or email already exists', 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into database

  const user = await connection.query(userQueries.createUser, [
    username,
    hashedPassword,
    email,
  ]);

  // Send token to client

  const payload = {
    id: user.rows[0].id,
    username: user.rows[0].username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

  res.status(200).cookie('token', token, {httpOnly: true}).json({
    status: 'success',
    token,
    user: user.rows[0],
  });
};

// Login user

const loginUser = async (req, res) => {
  const {username, password} = req.body;

  try {
    const {error} = await loginSchema.validateAsync(req.body, {abortEarly: false});
  } catch (error) {
    throw createError(error.details.map(e => e.message).join(', '), 400);
  }

  // Check if user exists
  const user = await connection.query(userQueries.userExistLogIn, [username]);

  if (!user.rows[0]) {
    throw createError('User does not exist, please sign up', 400);
  }

  // Check if password is correct

  const validatePassword = await bcrypt.compare(password, user.rows[0].password);

  if (!validatePassword) {
    throw createError('Password is incorrect', 400);
  }

  // Send token to client

  const payload = {
    id: user.rows[0].id,
    username: user.rows[0].username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).cookie('token', token, {httpOnly: true}).json({
    status: 'success',
    token,
  });
};

const logoutUser = (req, res) => {
  res.clearCookie('token').json({
    status: 'success',
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
