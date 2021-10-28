const express = require('express');
const router = express.Router();

const user = require('../controllers/user');

// Create user
router.post('/create', user.create);

// Sign In
router.post('/sign-in', user.signIn);

// Change Password
// router.post('/change-password', user.changePassword);

// Get list
router.get('/list/:company_id', user.getList);

// Get Profile
router.get('/:id', user.getProfile);

// Sign In

// Get User list
router.post('/search', user.searchUser);

module.exports = router;