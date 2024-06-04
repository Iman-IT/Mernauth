const express = require('express');
const { Userlogin, UserSignup } = require('../controllers/userController');

const router = express.Router();

// User signup
router.post('/signup', UserSignup);

// User login
router.post('/login', Userlogin);

module.exports = router;
