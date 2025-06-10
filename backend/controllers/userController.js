const User = require('../models/userModel');
const RevokedToken = require('../models/revokedTokenModel');
const bcrypt = require('bcrypt');
const createTokenCookie = require('../utils/createTokenCookie');
const { StatusCodes } = require('http-status-codes');
const { ApiError } = require('../utils/ApiError');
const code = require('../constant/errorCode');
const generateCsrfToken = require('../helpers/generateCsrfToken');

// ==================================================================================================================================

async function createUser(req, res) {
  const { username, email, password } = req.body;
  const emailExists = await User.findOne({ email });      // query email from our database

  if (emailExists) {
    throw new ApiError(code.EMAIL_ALREADY_EXISTS, StatusCodes.CONFLICT);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const createdUser = new User({
    username,
    email,
    password: hashedPassword
  });

  await createdUser.save();     // save the new user into our database
  res.sendStatus(StatusCodes.CREATED);
}

// ==================================================================================================================================

async function loginUser(req, res) {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });      // query email from our database

  if (foundUser) {
    const doesPasswordMatch = await bcrypt.compare(password, foundUser.password);
    if (doesPasswordMatch) {
      createTokenCookie(res, {
        id: foundUser._id,
        isAdmin: foundUser.isAdmin,
        csrfToken: generateCsrfToken()
      });

      return res.status(StatusCodes.OK).json({
        success: true,
        data: {
          id: foundUser._id,
          username: foundUser.username,
          email: foundUser.email,
        }
      });
    }
    throw new ApiError(code.WRONG_CREDENTIALS, StatusCodes.UNAUTHORIZED);

  } else {
    throw new ApiError(code.WRONG_CREDENTIALS, StatusCodes.UNAUTHORIZED);
  }
}

// ==================================================================================================================================

async function logoutUser(req, res) {
  // We should only store verified/legit submitted token in the revoked token list.
  const token = req.cookies.jwt;
  const verifiedToken = req.verifiedToken;

  const remainingTime = (verifiedToken.exp - verifiedToken.iat) * 1000;
  const addedrevokedToken = new RevokedToken({
    token,
    expireAt: new Date(new Date().getTime() + remainingTime)
  });

  await addedrevokedToken.save();

  res.clearCookie('jwt');
  return res.send(`login to /api/users/login`);
}

// ==================================================================================================================================

async function getCurrentUser(req, res) {
  const { id, csrfToken } = req.verifiedToken;
  const foundUser = await User.findById(id).select({ password: 0 }); // { password: 0 } means exclude password
  if (foundUser) {
    res.setHeader("xsrf-token", csrfToken);

    return res.status(StatusCodes.OK).json({
      success: true,
      data: {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email
      }
    });
  }

  throw new ApiError(code.NO_USER_FOUND, StatusCodes.NOT_FOUND);
}

// ==================================================================================================================================

async function updateCurrentUser(req, res) {
  const { id } = req.verifiedToken;
  // We still have to check if the user from jwt exist in the database because maybe it has been removed or deleted.
  const foundUser = await User.findById(id);

  if (foundUser) {
    const { username } = req.body;
    foundUser.username = username;

    const updatedUser = await foundUser.save();
    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email
      }
    });
  }
  throw new ApiError(code.NO_USER_FOUND, StatusCodes.NOT_FOUND);
}

// ==================================================================================================================================

async function getAllUsers(req, res) {
  const users = await User.find({});

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      users: users
    }
  });
}

// ==================================================================================================================================

module.exports = { createUser, loginUser, getCurrentUser, logoutUser, getAllUsers, updateCurrentUser };

// (async function createAdmin() {
//   const username = 'admin'
//   const email = 'admin@gmail.com'
//   const password = 'admin1234'

//   const salt = await bcrypt.genSalt(10)
//   const hashedPassword = await bcrypt.hash(password, salt)
//   new User({
//     username,
//     email,
//     password: hashedPassword,
//     isAdmin: true
//   }).save()
// })()

