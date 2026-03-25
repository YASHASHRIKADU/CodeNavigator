import { Link } from 'react-router-dom';
import { ArrowRight, Map, Target, TrendingUp, CheckCircle2, ChevronRight, Star } from 'lucide-react';

const features = [
    {
        icon: '🗺️',
        title: 'Personalized Roadmap',
        description: 'Get a custom step-by-step learning path tailored to your career goal and current skill level.',
        color: 'from-primary-500/10 to-primary-400/10 border-primary-200 dark:border-primary-800',
    },
    {
        icon: '🎯',
        title: 'Skill Gap Analysis',
        description: "Tell us what you know — we'll identify exactly what skills you need to learn next.",
        color: 'from-amber-400/10 to-orange-400/10 border-amber-200 dark:border-amber-800',
    },
    {
        icon: '📈',
        title: 'Progress Tracking',
        description: 'Mark skills as complete, track your progress visually, and stay motivated on your journey.',
        color: 'from-success/10 to-emerald-400/10 border-green-200 dark:border-green-800',
    },
];

const steps = [
    { num: '01', title: 'Select Career', desc: 'Choose your target role: Frontend, Backend, Full Stack, or Data Science.', icon: '🎯' },
    { num: '02', title: 'Analyze Skills', desc: 'Tell us which skills you already have — we identify your skill gaps.', icon: '🔍' },
    { num: '03', title: 'Follow Roadmap', desc: 'Get a structured learning path and track your progress stage by stage.', icon: '🚀' },
];

const testimonials = [
    { name: 'Priya M.', role: 'Now a Frontend Dev', quote: "CodeNavigator gave me the structure I was missing. I went from confusion to landing my first job in 8 months!" },
    { name: 'Arjun K.', role: 'Backend Engineer', quote: "The roadmap was exactly what I needed. No more random YouTube tutorials — just a clear path forward." },
    { name: 'Riya S.', role: 'Data Scientist', quote: "The skill gap analysis was eye-opening. I finally knew what to learn instead of feeling overwhelmed." },
];

export default function HomePage() {
    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-inter">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center shadow-md">
                            <span className="text-accent font-black text-base font-poppins">C</span>
                        </div>
                        <span className="font-black text-xl font-poppins">
                            <span className="text-primary-500">Code</span>
                            <span className="text-accent">Navigator</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="btn-ghost text-sm">Log in</Link>
                        <Link to="/signup" className="btn-primary text-sm py-2 px-4">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                {/* Background decorations */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left content */}
                        <div className="animate-slide-up">
                            <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 text-primary-500 dark:text-primary-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-primary-200 dark:border-primary-700">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                Smart Learning for Tech Careers
                            </div>
                            <h1 className="font-poppins text-5xl lg:text-6xl font-black text-text-primary dark:text-gray-100 leading-tight mb-6">
                                Build Your Tech Career with a{' '}
                                <span className="text-primary-500 relative">
                                    Smart Learning
                                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 8" fill="none">
                                        <path d="M0 6 Q150 0 300 6" stroke="#f2c4cd" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                </span>{' '}
                                Roadmap
                            </h1>
                            <p className="text-lg text-text-secondary dark:text-gray-400 mb-8 leading-relaxed max-w-lg">
                                Generate personalized learning paths, identify skill gaps, and track your progress toward becoming a professional developer — all in one place.
                            </p>
                            <div className="flex flex-wrap gap-4 mb-8">
                                <Link to="/signup" className="btn-primary text-base px-8 py-3.5">
                                    Start Learning <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link to="/login" className="btn-secondary text-base px-8 py-3.5">
                                    Explore Roadmaps <Map className="w-5 h-5" />
                                </Link>
                            </div>
                            {/* Social proof */}
                            <div className="flex items-center gap-6">
                                <div className="flex -space-x-2">
                                    {['A', 'B', 'C', 'D'].map((l, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-primary-500 border-2 border-white dark:border-bg-dark flex items-center justify-center text-xs text-white font-bold">
                                            {l}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex text-amber-400">{'★★★★★'}</div>
                                    <p className="text-xs text-text-secondary dark:text-gray-400">Loved by 2,000+ learners</p>
                                </div>
                            </div>
                        </div>

                        {/* Right — visual */}
                        <div className="relative animate-fade-in hidden lg:block">
                            {/* Mock dashboard preview */}
                            <div className="relative bg-white dark:bg-card-dark rounded-3xl shadow-card-hover p-6 border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                    <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-700 rounded-lg mx-4" />
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {[{ l: 'Completed', v: '12', c: 'bg-success/10 text-success' }, { l: 'In Progress', v: '4', c: 'bg-amber-100 text-amber-600' }, { l: 'Total Skills', v: '16', c: 'bg-primary-50 text-primary-500' }].map(s => (
                                        <div key={s.l} className={`rounded-xl p-3 ${s.c}`}>
                                            <p className="text-lg font-black font-poppins">{s.v}</p>
                                            <p className="text-xs opacity-70">{s.l}</p>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-xs font-semibold text-text-secondary dark:text-gray-400 mb-2">Frontend Roadmap Progress</p>
                                <div className="space-y-2">
                                    {[{ s: 'Web Fundamentals', p: 100 }, { s: 'JavaScript Core', p: 75 }, { s: 'React', p: 30 }, { s: 'Projects', p: 0 }].map(r => (
                                        <div key={r.s} className="flex items-center gap-3">
                                            <span className="text-xs w-28 truncate text-text-secondary dark:text-gray-400">{r.s}</span>
                                            <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-primary-500 to-success rounded-full" style={{ width: `${r.p}%` }} />
                                            </div>
                                            <span className="text-xs font-bold text-primary-500 w-8 text-right">{r.p}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Floating badges */}
                            <div className="absolute -top-4 -right-4 bg-white dark:bg-card-dark rounded-2xl shadow-card p-3 border border-gray-100 dark:border-gray-700 flex items-center gap-2 animate-pulse-slow">
                                <CheckCircle2 className="w-5 h-5 text-success" />
                                <span className="text-xs font-semibold text-text-primary dark:text-gray-100">Skill Completed!</span>
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-card-dark rounded-2xl shadow-card p-3 border border-gray-100 dark:border-gray-700">
                                <p className="text-xs text-text-secondary dark:text-gray-400">Daily Streak 🔥</p>
                                <p className="text-xl font-black text-primary-500 font-poppins">12 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-card-dark/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="section-title mb-4">Everything you need to level up</h2>
                        <p className="text-text-secondary dark:text-gray-400 max-w-xl mx-auto">
                            All the tools a beginner developer needs to go from confused to confident.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <div key={i} className={`rounded-2xl p-6 bg-gradient-to-br border ${f.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover`}>
                                <div className="text-4xl mb-4">{f.icon}</div>
                                <h3 className="font-bold text-lg font-poppins text-text-primary dark:text-gray-100 mb-2">{f.title}</h3>
                                <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="section-title mb-4">How It Works</h2>
                        <p className="text-text-secondary dark:text-gray-400 max-w-xl mx-auto">Three simple steps to get your personalized tech career roadmap.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting line */}
                        <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-500 via-accent to-primary-500 opacity-30" />
                        {steps.map((step, i) => (
                            <div key={i} className="text-center group">
                                <div className="relative inline-block mb-6">
                                    <div className="w-24 h-24 rounded-3xl bg-white dark:bg-card-dark border-2 border-primary-200 dark:border-primary-700 flex items-center justify-center text-4xl shadow-card group-hover:shadow-card-hover group-hover:border-primary-400 transition-all duration-300 group-hover:-translate-y-1">
                                        {step.icon}
                                    </div>
                                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary-500 text-white text-xs font-black flex items-center justify-center font-poppins shadow-md">
                                        {i + 1}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg font-poppins text-text-primary dark:text-gray-100 mb-2">{step.title}</h3>
                                <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white dark:bg-card-dark/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="section-title mb-4">What learners say</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div key={i} className="card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5">
                                <div className="flex text-amber-400 mb-3">{'★★★★★'}</div>
                                <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">{t.name[0]}</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-text-primary dark:text-gray-100">{t.name}</p>
                                        <p className="text-xs text-success">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent rounded-full translate-y-1/2 -translate-x-1/2" />
                        </div>
                        <div className="relative">
                            <h2 className="text-3xl lg:text-4xl font-black font-poppins text-white mb-4">
                                Ready to start your tech journey?
                            </h2>
                            <p className="text-white/80 mb-8 max-w-lg mx-auto">
                                Join thousands of learners who have used CodeNavigator to build their careers. It's free to get started.
                            </p>
                            <Link to="/signup" className="inline-flex items-center gap-2 bg-accent text-primary-900 font-bold px-8 py-4 rounded-xl hover:bg-amber-400 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-lg">
                                Generate Your Roadmap <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-primary-500 flex items-center justify-center">
                            <span className="text-accent font-black text-xs">C</span>
                        </div>
                        <span className="font-bold text-sm text-text-primary dark:text-gray-100 font-poppins">CodeNavigator</span>
                    </div>
                    <p className="text-xs text-text-secondary dark:text-gray-400">© 2024 CodeNavigator. Made with ❤️ for learners.</p>
                </div>
            </footer>
        </div>
    );
}
