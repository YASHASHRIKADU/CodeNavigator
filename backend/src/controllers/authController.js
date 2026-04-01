const jwt           = require('jsonwebtoken');
const crypto        = require('crypto');
const User          = require('../models/User');
const { sendOtpEmail } = require('../utils/email');

// ─── Helper: sign JWT ─────────────────────────────────────────────────────────
const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

// ─── Helper: hash an OTP for safe DB storage ──────────────────────────────────
const hashOtp = (otp) => crypto.createHash('sha256').update(otp).digest('hex');

// ─── POST /api/v1/auth/signup ─────────────────────────────────────────────────
const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ success: false, message: 'An account with this email already exists' });
        }

        const user  = await User.create({ name, email, password });
        const token = signToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token,
            user: {
                id:         user._id,
                name:       user.name,
                email:      user.email,
                careerGoal: user.careerGoal,
                createdAt:  user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

// ─── POST /api/v1/auth/login ──────────────────────────────────────────────────
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = signToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id:         user._id,
                name:       user.name,
                email:      user.email,
                careerGoal: user.careerGoal,
                createdAt:  user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

// ─── GET /api/v1/auth/profile  [protected] ───────────────────────────────────
const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

// ─── PUT /api/v1/auth/profile  [protected] ───────────────────────────────────
const updateProfile = async (req, res, next) => {
    try {
        const allowedFields = ['name', 'careerGoal'];
        const updates = {};
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        const user = await User.findByIdAndUpdate(req.user._id, updates, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

// ─── PUT /api/v1/auth/change-password  [protected] ────────────────────────────
const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'currentPassword and newPassword are required.' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
        }

        const user = await User.findById(req.user._id).select('+password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
        }

        user.password = newPassword; // pre-save hook will hash it
        await user.save();

        res.status(200).json({ success: true, message: 'Password changed successfully.' });
    } catch (error) {
        next(error);
    }
};

// ─── POST /api/v1/auth/send-otp ──────────────────────────────────────────────
// Step 1: verify email exists → generate OTP → email it
const sendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store hashed OTP with 5 min expiry
        user.otp       = hashOtp(otp);
        user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save({ validateBeforeSave: false });

        console.log("Sending OTP to:", email);
        console.log("Using email:", process.env.EMAIL_USER);
        console.log("OTP:", otp);

        try {
            // Send OTP via email
            await sendOtpEmail(email, otp);

            res.status(200).json({
                success: true,
                message: 'OTP sent successfully',
            });
        } catch (emailError) {
            console.error("Email sending error:", emailError);
            return res.status(500).json({
                success: false,
                message: 'Failed to send OTP'
            });
        }
    } catch (error) {
        next(error);
    }
};

// ─── POST /api/v1/auth/verify-otp ────────────────────────────────────────────
// Step 2: check the OTP is correct and not expired (does NOT clear OTP yet)
const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email }).select('+otp +otpExpiry');
        if (!user || !user.otp || !user.otpExpiry) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
        }

        if (user.otp !== hashOtp(otp)) {
            return res.status(400).json({ success: false, message: 'Incorrect OTP. Please try again.' });
        }

        // OTP is valid — signal success (OTP cleared at reset step)
        res.status(200).json({ success: true, message: 'OTP verified successfully.' });
    } catch (error) {
        next(error);
    }
};

// ─── POST /api/v1/auth/reset-password ────────────────────────────────────────
// Step 3: verify OTP one final time, update password, clear OTP
const resetPassword = async (req, res, next) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ email }).select('+otp +otpExpiry +password');
        if (!user || !user.otp || !user.otpExpiry) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
        }

        if (user.otp !== hashOtp(otp)) {
            return res.status(400).json({ success: false, message: 'Incorrect OTP. Please try again.' });
        }

        // Update password and clear OTP fields
        user.password  = newPassword;
        user.otp       = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successful. You can now log in.' });
    } catch (error) {
        next(error);
    }
};

module.exports = { signup, login, getProfile, updateProfile, changePassword, sendOtp, verifyOtp, resetPassword };
