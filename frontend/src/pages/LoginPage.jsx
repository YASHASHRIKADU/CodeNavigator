import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../store/AuthContext';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
        setLoading(true);
        try {
            const result = await login(form.email, form.password, rememberMe);
            if (result.success) {
                navigate(result.user.career ? '/dashboard' : '/career');
            } else {
                setError('Invalid email or password.');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="p-2">
                <h2 className="text-2xl font-bold font-poppins text-text-primary dark:text-gray-100 mb-1">Welcome back</h2>
                <p className="text-text-secondary dark:text-gray-400 text-sm mb-6">Log in to continue your learning journey.</p>

                {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">Email address</label>
                        <input
                            type="email" name="email" value={form.email} onChange={handleChange}
                            placeholder="you@example.com" className="input-field" autoComplete="email"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="label mb-0">Password</label>
                            <Link
                                to="/forgot-password"
                                className="text-xs text-primary-500 hover:underline font-medium"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                                placeholder="••••••••" className="input-field pr-11" autoComplete="current-password"
                            />
                            <button
                                type="button" onClick={() => setShowPw(!showPw)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors"
                            >
                                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-2 pt-1">
                        <input
                            id="rememberMe"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={e => setRememberMe(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-primary-500 accent-primary-500 cursor-pointer"
                        />
                        <label htmlFor="rememberMe" className="text-sm text-text-secondary dark:text-gray-400 cursor-pointer select-none">
                            Remember Me
                        </label>
                    </div>

                    <button
                        type="submit" disabled={loading}
                        className="w-full btn-primary justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Logging in...</span>
                        ) : (
                            <><LogIn className="w-4 h-4" /> Log In</>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-text-secondary dark:text-gray-400 mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary-500 font-semibold hover:underline">Sign up</Link>
                </p>
            </div>
        </AuthLayout>
    );
}
