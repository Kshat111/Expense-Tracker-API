const express = require('express');
const { signUp, logIn } = require('../controllers/authController'); // Fix: Change to correct function names
const router = express.Router();

// POST /api/auth/signup - Create a new user
router.post('/signup', signUp); // Fix: Correct function name

// POST /api/auth/login - Log in a user and return JWT
router.post('/login', logIn); // Fix: Correct function name

module.exports = router;
