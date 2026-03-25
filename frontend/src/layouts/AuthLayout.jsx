import { Link } from 'react-router-dom';

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md animate-slide-up">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-2xl bg-primary-500 flex items-center justify-center shadow-glow group-hover:shadow-lg transition-all">
                            <span className="text-accent font-black text-xl font-poppins">C</span>
                        </div>
                        <div>
                            <span className="text-primary-500 font-black text-2xl font-poppins">Code</span>
                            <span className="text-accent font-black text-2xl font-poppins">Navigator</span>
                        </div>
                    </Link>
                </div>

                <div className="card shadow-card-hover">
                    {children}
                </div>
            </div>
        </div>
    );
}
