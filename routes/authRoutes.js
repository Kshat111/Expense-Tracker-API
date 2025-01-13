const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// POST /api/auth/signup - Create a new user
router.post('/signup', signup);

// POST /api/auth/login - Log in a user and return JWT
router.post('/login', login);

module.exports = router;
