const { body, param, validationResult } = require('express-validator');

/**
 * Reads validation errors from express-validator and returns 400 if any exist.
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
        });
    }
    next();
};

// ─── Auth Validation Rules ───────────────────────────────────────────────────
const signupRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be 2–50 characters'),
    body('email')
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Please enter a valid email address'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginRules = [
    body('email')
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Please enter a valid email address'),
    body('password')
        .notEmpty().withMessage('Password is required'),
];

// ─── OTP / Password Reset Validation Rules ─────────────────────────────────────
const sendOtpRules = [
    body('email')
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Please enter a valid email address'),
];

const verifyOtpRules = [
    body('email')
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Please enter a valid email address'),
    body('otp')
        .trim()
        .isLength({ min: 6, max: 6 }).withMessage('OTP must be exactly 6 digits')
        .isNumeric().withMessage('OTP must contain only digits'),
];

const resetPasswordRules = [
    body('email')
        .trim()
        .normalizeEmail()
        .isEmail().withMessage('Please enter a valid email address'),
    body('otp')
        .trim()
        .isLength({ min: 6, max: 6 }).withMessage('OTP must be exactly 6 digits')
        .isNumeric().withMessage('OTP must contain only digits'),
    body('newPassword')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// ─── Progress Validation Rules ───────────────────────────────────────────────
const progressRules = [
    body('skillId')
        .trim()
        .notEmpty().withMessage('skillId is required'),
    body('status')
        .isIn(['not-started', 'in-progress', 'completed'])
        .withMessage('status must be not-started, in-progress, or completed'),
    body('roadmapId')
        .optional()
        .trim(),
];

module.exports = {
    handleValidationErrors,
    signupRules,
    loginRules,
    sendOtpRules,
    verifyOtpRules,
    resetPasswordRules,
    progressRules,
};
