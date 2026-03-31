import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Map, BookOpen, BarChart2, User,
    ChevronLeft, ChevronRight, Menu, X,
    Compass, Target, TrendingUp
} from 'lucide-react';
import { useAuth } from '../store/AuthContext';

import clsx from 'clsx';

const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/career', label: 'Career Path', icon: Compass },
    { to: '/assessment', label: 'Skill Check', icon: Target },
    { to: '/roadmap', label: 'My Roadmap', icon: Map },
    { to: '/progress', label: 'Progress', icon: TrendingUp },
    { to: '/resources', label: 'Resources', icon: BookOpen },
];

export default function Sidebar() {
    const [collapsed, setCollapsed]         = useState(false);
    const [mobileOpen, setMobileOpen]       = useState(false);

    const { user } = useAuth();
    const location = useLocation();

    const initials = (user?.name && typeof user?.name === 'string') ? user.name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0,2) || 'U' : 'U';

    const SidebarContent = ({ mobile = false }) => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className={clsx(
                'flex items-center gap-3 p-4 border-b border-white/10',
                collapsed && !mobile ? 'justify-center px-2' : ''
            )}>
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-primary-500 font-black text-lg font-poppins">C</span>
                </div>
                {(!collapsed || mobile) && (
                    <div>
                        <span className="text-white font-bold text-lg font-poppins leading-none">Code</span>
                        <span className="text-accent font-bold text-lg font-poppins leading-none">Navigator</span>
                    </div>
                )}
            </div>

            {/* Nav Items */}
            <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
                {navItems.map(({ to, label, icon: Icon }) => {
                    const active = location.pathname === to || location.pathname.startsWith(to + '/');
                    return (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => mobile && setMobileOpen(false)}
                            className={clsx(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                                active
                                    ? 'bg-white/15 text-white shadow-sm'
                                    : 'text-white/60 hover:bg-white/10 hover:text-white',
                                collapsed && !mobile ? 'justify-center px-2' : ''
                            )}
                            title={collapsed && !mobile ? label : undefined}
                        >
                            {active && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full" />
                            )}
                            <Icon className={clsx('flex-shrink-0 transition-transform', active ? 'text-accent' : 'text-white/60 group-hover:text-white', 'w-5 h-5')} />
                            {(!collapsed || mobile) && (
                                <span className="text-sm font-medium font-inter">{label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User + Profile + Logout */}
            <div className="p-3 border-t border-white/10 space-y-2">
                {(!collapsed || mobile) && (
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-900 font-bold text-xs">{initials}</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-white text-xs font-semibold truncate">{user?.name}</p>
                            <p className="text-white/50 text-xs truncate">{user?.email}</p>
                        </div>
                    </div>
                )}
                <Link
                    to="/profile"
                    onClick={() => mobile && setMobileOpen(false)}
                    className={clsx(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                        (location.pathname === '/profile' || location.pathname.startsWith('/profile/'))
                            ? 'bg-white/15 text-white shadow-sm'
                            : 'text-white/60 hover:bg-white/10 hover:text-white',
                        collapsed && !mobile ? 'justify-center px-2' : ''
                    )}
                    title={collapsed && !mobile ? 'Profile' : undefined}
                >
                    {(location.pathname === '/profile' || location.pathname.startsWith('/profile/')) && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full" />
                    )}
                    <User className={clsx('flex-shrink-0 transition-transform', (location.pathname === '/profile' || location.pathname.startsWith('/profile/')) ? 'text-accent' : 'text-white/60 group-hover:text-white', 'w-5 h-5')} />
                    {(!collapsed || mobile) && (
                        <span className="text-sm font-medium font-inter">Profile</span>
                    )}
                </Link>


            </div>
        </div>
    );

    return (
        <>
            {/* Mobile toggle button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-primary-500 text-white shadow-lg"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                    <div className="relative w-64 bg-primary-500 shadow-2xl animate-slide-up">
                        <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-white/60 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                        <SidebarContent mobile />
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className={clsx(
                'hidden lg:flex flex-col bg-primary-500 transition-all duration-300 flex-shrink-0 relative',
                collapsed ? 'w-16' : 'w-60'
            )}>
                <SidebarContent />
                {/* Collapse toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary-500 border-2 border-white/20 text-white flex items-center justify-center hover:bg-primary-400 transition-all duration-200 shadow-md z-10"
                >
                    {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
                </button>
            </div>


        </>
    );
}
