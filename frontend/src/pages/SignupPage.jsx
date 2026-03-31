import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../store/AuthContext';

export default function SignupPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); return; }
        if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
        if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
        setLoading(true);
        try {
            const result = await signup(form.name, form.email, form.password);
            if (result.success) navigate('/career');
        } catch(err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="p-2">
                <h2 className="text-2xl font-bold font-poppins text-text-primary dark:text-gray-100 mb-1">Create your account</h2>
                <p className="text-text-secondary dark:text-gray-400 text-sm mb-6">Start your tech career journey today. It's free.</p>

                {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">Full name</label>
                        <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Alex Johnson" className="input-field" autoComplete="name" />
                    </div>
                    <div>
                        <label className="label">Email address</label>
                        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field" autoComplete="email" />
                    </div>
                    <div>
                        <label className="label">Password</label>
                        <div className="relative">
                            <input
                                type={showPw ? 'text' : 'password'} id="password" name="password" value={form.password} onChange={handleChange}
                                placeholder="Min. 6 characters" className="input-field pr-11" autoComplete="new-password"
                            />
                            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500 transition-colors">
                                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="label">Confirm password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat your password" className="input-field" autoComplete="new-password" />
                    </div>

                    <button type="submit" disabled={loading} className="w-full btn-primary justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                        {loading ? (
                            <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</span>
                        ) : (
                            <><UserPlus className="w-4 h-4" /> Create Account</>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-text-secondary dark:text-gray-400 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-500 font-semibold hover:underline">Log in</Link>
                </p>
            </div>
        </AuthLayout>
    );
}
