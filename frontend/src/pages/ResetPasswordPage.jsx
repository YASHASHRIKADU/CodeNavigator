import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import { authAPI } from '../services/api';

export default function ResetPasswordPage() {
    const navigate          = useNavigate();
    const { state }         = useLocation();

    // Email + OTP come from navigation state (set by ForgotPasswordPage after OTP verified)
    // Fall back to empty strings so the page also works if visited directly
    const [email, setEmail]     = useState(state?.email || '');
    const [otp, setOtp]         = useState(state?.otp   || '');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPw, setShowPw]   = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        if (!email.trim())     { setError('Email is required.'); return; }
        if (!otp.trim())       { setError('OTP is required.'); return; }
        if (!password)         { setError('Please enter a new password.'); return; }
        if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
        if (password !== confirm) { setError('Passwords do not match.'); return; }

        setLoading(true);
        try {
            await authAPI.resetPassword(email.trim(), otp.trim(), password);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2500);
        } catch (err) {
            if (err.status === 400) {
                setError(err.payload?.message || 'Invalid or expired OTP. Please request a new one.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="p-2">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-primary-500" />
                    </div>
                    <h2 className="text-2xl font-bold font-poppins text-text-primary dark:text-gray-100">
                        Reset Password
                    </h2>
                </div>
                <p className="text-text-secondary dark:text-gray-400 text-sm mb-6">
                    Choose a new password for <strong className="text-text-primary dark:text-white">{email || 'your account'}</strong>.
                </p>

                {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {success ? (
                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm space-y-2">
                        <p className="font-semibold">Password reset successfully! 🎉</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400">
                            Redirecting you to the login page…
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Show email + OTP fields only if NOT pre-filled from navigation state */}
                        {!state?.email && (
                            <div>
                                <label className="label">Email address</label>
                                <input
                                    type="email" value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="input-field"
                                    autoComplete="email"
                                />
                            </div>
                        )}

                        {!state?.otp && (
                            <div>
                                <label className="label">OTP</label>
                                <input
                                    type="text" value={otp}
                                    onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="6-digit OTP"
                                    className="input-field font-mono tracking-widest text-center"
                                    autoComplete="off"
                                    maxLength={6}
                                />
                            </div>
                        )}

                        {/* New password */}
                        <div>
                            <label className="label">New Password</label>
                            <div className="relative">
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Min. 6 characters"
                                    className="input-field pr-11"
                                    autoComplete="new-password"
                                    autoFocus={!!state?.email}
                                />
                                <button
                                    type="button" onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors"
                                >
                                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label className="label">Confirm New Password</label>
                            <input
                                type={showPw ? 'text' : 'password'}
                                value={confirm}
                                onChange={e => setConfirm(e.target.value)}
                                placeholder="Re-enter password"
                                className="input-field"
                                autoComplete="new-password"
                            />
                            {/* Inline mismatch hint */}
                            {confirm && password !== confirm && (
                                <p className="mt-1 text-xs text-red-500">Passwords do not match.</p>
                            )}
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full btn-primary justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Resetting...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" /> Reset Password
                                </span>
                            )}
                        </button>
                    </form>
                )}

                <p className="text-center text-sm text-text-secondary dark:text-gray-400 mt-6">
                    Back to{' '}
                    <Link to="/login" className="text-primary-500 font-semibold hover:underline">Log in</Link>
                    {' '}·{' '}
                    <Link to="/forgot-password" className="text-primary-500 font-semibold hover:underline">Get new OTP</Link>
                </p>
            </div>
        </AuthLayout>
    );
}
