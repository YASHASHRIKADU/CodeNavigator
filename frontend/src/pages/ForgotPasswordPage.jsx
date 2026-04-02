import { useState, useEffect, useRef, useCallback} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Mail, ArrowRight, KeyRound, RefreshCw, CheckCircle} from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import { authAPI} from '../services/api';

// ─── Countdown timer hook ─────────────────────────────────────────────────────
function useCountdown(seconds) {
 const [timeLeft, setTimeLeft] = useState(seconds);
 const intervalRef = useRef(null);

 const start = useCallback(() => {
 setTimeLeft(seconds);
 clearInterval(intervalRef.current);
 intervalRef.current = setInterval(() => {
 setTimeLeft(t => {
 if (t <= 1) { clearInterval(intervalRef.current); return 0;}
 return t - 1;
});
}, 1000);
}, [seconds]);

 useEffect(() => () => clearInterval(intervalRef.current), []);

 const fmt = t => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
 return { timeLeft, start, formatted: fmt(timeLeft)};
}

// ─── 6-box OTP input component ────────────────────────────────────────────────
function OtpInput({ value, onChange, disabled}) {
 const inputRefs = useRef([]);
 const digits = value.split('');

 const handleKey = (e, idx) => {
 if (e.key === 'Backspace') {
 const next = [...digits];
 if (next[idx]) {
 next[idx] = '';
 onChange(next.join(''));
} else if (idx > 0) {
 next[idx - 1] = '';
 onChange(next.join(''));
 inputRefs.current[idx - 1]?.focus();
}
 return;
}
 if (e.key === 'ArrowLeft' && idx > 0) { inputRefs.current[idx - 1]?.focus(); return;}
 if (e.key === 'ArrowRight' && idx < 5) { inputRefs.current[idx + 1]?.focus(); return;}
};

 const handleChange = (e, idx) => {
 const v = e.target.value.replace(/\D/g, '').slice(-1);
 if (!v) return;
 const next = [...digits];
 next[idx] = v;
 onChange(next.join(''));
 if (idx < 5) inputRefs.current[idx + 1]?.focus();
};

 const handlePaste = (e) => {
 const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
 if (text) { onChange(text.padEnd(6, '').slice(0, 6)); inputRefs.current[Math.min(text.length, 5)]?.focus();}
 e.preventDefault();
};

 return (
 <div className="flex gap-2 justify-center">
 {Array.from({ length: 6}).map((_, idx) => (
 <input
 key={idx}
 ref={el => (inputRefs.current[idx] = el)}
 type="text"
 inputMode="numeric"
 maxLength={1}
 name={`otp-${idx}`}
 value={digits[idx] || ''}
 disabled={disabled}
 onChange={e => handleChange(e, idx)}
 onKeyDown={e => handleKey(e, idx)}
 onPaste={handlePaste}
 onClick={() => inputRefs.current[idx]?.select()}
 className={`w-11 h-12 text-center text-lg font-bold rounded-xl border-2 transition-all duration-200 outline-none
 ${digits[idx]
 ? 'border-primary-500 bg-primary-500/5 text-text-primary '
 : 'border-gray-200 bg-white text-text-primary '}
 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
 disabled:opacity-50 disabled:cursor-not-allowed`}
 />
 ))}
 </div>
 );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const OTP_SECONDS = 300; // 5 minutes

export default function ForgotPasswordPage() {
 const [step, setStep] = useState(1); // 1 = email, 2 = OTP, 3 = verified
 const [email, setEmail] = useState('');
 const [otp, setOtp] = useState('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [resending, setResending] = useState(false);
 const countdown = useCountdown(OTP_SECONDS);
 const navigate = useNavigate();

 // ── Step 1: send OTP ──────────────────────────────────────────────────────
 const handleSendOtp = async (e) => {
 e?.preventDefault();
 setError('');
 if (!email.trim()) { setError('Please enter your email address.'); return;}
 setLoading(true);
 try {
 await authAPI.sendOtp(email.trim());
 setStep(2);
 setOtp('');
 countdown.start();
} catch (err) {
 if (err.status === 404) setError('User not found. Please check your email address.');
 else setError('Failed to send OTP. Please try again.');
} finally {
 setLoading(false);
}
};

 // ── Resend OTP ────────────────────────────────────────────────────────────
 const handleResend = async () => {
 setError('');
 setOtp('');
 setResending(true);
 try {
 await authAPI.sendOtp(email.trim());
 countdown.start();
} catch {
 setError('Failed to resend OTP. Please try again.');
} finally {
 setResending(false);
}
};

 // ── Step 2: verify OTP ────────────────────────────────────────────────────
 const handleVerifyOtp = async (e) => {
 e?.preventDefault();
 setError('');
 if (otp.length < 6) { setError('Please enter the complete 6-digit OTP.'); return;}
 setLoading(true);
 try {
 await authAPI.verifyOtp(email.trim(), otp);
 setStep(3);
 // Navigate to reset page with email + otp in state (not URL, more secure)
 setTimeout(() => navigate('/reset-password', { state: { email: email.trim(), otp}}), 600);
} catch (err) {
 if (err.status === 400) setError(err.payload?.message || 'Invalid or expired OTP.');
 else setError('Something went wrong. Please try again.');
 setOtp('');
} finally {
 setLoading(false);
}
};

 // Auto-verify when all 6 digits entered
 useEffect(() => {
 if (step === 2 && otp.length === 6 && !loading) {
 handleVerifyOtp();
}
}, [otp]);

 return (
 <AuthLayout>
 <div className="p-2">
 {/* Header */}
 <div className="flex items-center gap-3 mb-1">
 <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center">
 <KeyRound className="w-5 h-5 text-primary-500"/>
 </div>
 <h2 className="text-2xl font-bold font-poppins text-text-primary">
 Forgot Password
 </h2>
 </div>

 {/* Step indicator */}
 <div className="flex items-center gap-1.5 mb-6 mt-3">
 {['Email', 'Verify OTP', 'Reset'].map((label, i) => (
 <div key={label} className="flex items-center gap-1.5">
 <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
 ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
 {step > i + 1 ? '✓' : i + 1}
 </div>
 <span className={`text-xs font-medium ${step === i + 1 ? 'text-primary-500' : 'text-gray-400'}`}>{label}</span>
 {i < 2 && <div className={`flex-1 h-px w-6 ${step > i + 1 ? 'bg-green-400' : 'bg-gray-200 '}`} />}
 </div>
 ))}
 </div>

 {/* Error */}
 {error && (
 <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
 {error}
 </div>
 )}

 {/* ── Step 1: Email ── */}
 {step === 1 && (
 <form onSubmit={handleSendOtp} className="space-y-4">
 <p className="text-text-secondary text-sm">
 Enter your registered email and we'll send a 6-digit OTP.
 </p>
 <div>
 <label className="label">Email address</label>
 <div className="relative">
 <input
 type="email"id="forgot-email"name="email"value={email}
 onChange={e => setEmail(e.target.value)}
 placeholder="you@example.com"
 className="input-field pl-10"
 autoComplete="email"autoFocus
 />
 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
 </div>
 </div>
 <button type="submit"disabled={loading}
 className="w-full btn-primary justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed">
 {loading
 ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Sending OTP...</span>
 : <span className="flex items-center gap-2"><ArrowRight className="w-4 h-4"/> Send OTP</span>}
 </button>
 </form>
 )}

 {/* ── Step 2: OTP Entry ── */}
 {step === 2 && (
 <div className="space-y-5">
 <p className="text-text-secondary text-sm">
 We sent a 6-digit OTP to <strong className="text-text-primary">{email}</strong>.
 Enter it below.
 </p>

 <OtpInput value={otp} onChange={setOtp} disabled={loading} />

 {/* Timer + Resend */}
 <div className="text-center space-y-2">
 {countdown.timeLeft > 0 ? (
 <p className="text-sm text-text-secondary">
 OTP expires in{' '}
 <span className={`font-mono font-bold ${countdown.timeLeft <= 60 ? 'text-red-500' : 'text-primary-500'}`}>
 {countdown.formatted}
 </span>
 </p>
 ) : (
 <p className="text-sm text-red-500 font-medium">OTP expired.</p>
 )}

 <button
 type="button"
 onClick={handleResend}
 disabled={countdown.timeLeft > 0 || resending}
 className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:underline disabled:opacity-40 disabled:cursor-not-allowed disabled:no-underline transition-opacity"
 >
 <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
 {resending ? 'Resending...' : 'Resend OTP'}
 </button>
 </div>

 <button
 type="button"
 onClick={handleVerifyOtp}
 disabled={loading || otp.length < 6}
 className="w-full btn-primary justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
 >
 {loading
 ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Verifying...</span>
 : <span className="flex items-center gap-2"><ArrowRight className="w-4 h-4"/> Verify OTP</span>}
 </button>

 <button type="button"onClick={() => { setStep(1); setOtp(''); setError('');}}
 className="w-full text-sm text-text-secondary hover:text-primary-500 transition-colors">
 ← Change email
 </button>
 </div>
 )}

 {/* ── Step 3: Success / Redirect ── */}
 {step === 3 && (
 <div className="text-center space-y-3 py-4">
 <div className="flex justify-center">
 <CheckCircle className="w-14 h-14 text-green-500"/>
 </div>
 <p className="font-semibold text-text-primary">OTP verified!</p>
 <p className="text-sm text-text-secondary">Redirecting to password reset...</p>
 <span className="inline-block w-5 h-5 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto"/>
 </div>
 )}

 <p className="text-center text-sm text-text-secondary mt-6">
 Remember your password?{' '}
 <Link to="/login"className="text-primary-500 font-semibold hover:underline">Log in</Link>
 </p>
 </div>
 </AuthLayout>
 );
}
