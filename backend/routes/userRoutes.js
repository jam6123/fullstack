const {
  createUser,
  loginUser,
  getCurrentUser,
  updateCurrentUser,
  logoutUser,
  getAllUsers
} = require('../controllers/userController');
const isAdmin = require('../middleware/isAdmin.js');
const { validateLoginData, validateSignupData, validateUpdateData } = require('../middleware/validate.js');
const authenticate = require('../middleware/authenticate.js');
const csrfProtection = require('../middleware/csrfProtection.js');
const express = require('express');
const limitRequest = require('../middleware/limitRequest.js');
const router = express.Router();


router.route('/profile')
  .get(authenticate, getCurrentUser)
  .put(authenticate, csrfProtection, validateUpdateData, updateCurrentUser);
  
router.post('/signup', validateSignupData, createUser);

router.post('/login', limitRequest, validateLoginData, loginUser);

router.post('/logout', authenticate, csrfProtection, logoutUser);

// Admin routes 👇👇👇
router.get("/", authenticate, isAdmin, getAllUsers);

module.exports = router

