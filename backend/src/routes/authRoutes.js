const express  = require('express');
const router   = express.Router();
const { signup, login, getProfile, updateProfile, changePassword, sendOtp, verifyOtp, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { signupRules, loginRules, sendOtpRules, verifyOtpRules, resetPasswordRules, handleValidationErrors } = require('../middleware/validate');

// POST /api/v1/auth/signup
router.post('/signup', signupRules, handleValidationErrors, signup);

// POST /api/v1/auth/login
router.post('/login', loginRules, handleValidationErrors, login);

// GET  /api/v1/auth/profile
router.get('/profile', protect, getProfile);

// PUT  /api/v1/auth/profile
router.put('/profile', protect, updateProfile);

// PUT  /api/v1/auth/change-password
router.put('/change-password', protect, changePassword);

// POST /api/v1/auth/send-otp  — Step 1: email OTP to user
router.post('/send-otp', sendOtpRules, handleValidationErrors, sendOtp);

// POST /api/v1/auth/verify-otp  — Step 2: confirm OTP is valid
router.post('/verify-otp', verifyOtpRules, handleValidationErrors, verifyOtp);

// POST /api/v1/auth/reset-password  — Step 3: set new password (re-verifies OTP)
router.post('/reset-password', resetPasswordRules, handleValidationErrors, resetPassword);

module.exports = router;
