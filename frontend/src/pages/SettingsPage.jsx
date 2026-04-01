import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../store/AuthContext';
import { useUser } from '../store/UserContext';
import { authAPI, progressAPI } from '../services/api';
import {
    User, Mail, Briefcase, Shield, Bell, Moon, Sun,
    RotateCcw, Eye, EyeOff, Check, AlertTriangle, Loader2,
    ChevronRight, Settings, LogOut
} from 'lucide-react';

// ─── Reusable Toggle Switch ───────────────────────────────────────────────────
function Toggle({ id, checked, onChange, label, description }) {
    return (
        <div className="flex items-center justify-between py-3" id={id}>
            <div className="flex-1 min-w-0 pr-4">
                <p className="text-sm font-semibold text-text-primary dark:text-gray-100">{label}</p>
                {description && <p className="text-xs text-text-secondary dark:text-gray-400 mt-0.5">{description}</p>}
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    checked ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-600'
                }`}
            >
                <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
            </button>
        </div>
    );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function SettingsSection({ icon: Icon, title, children, danger = false }) {
    return (
        <div className={`card ${danger ? 'border border-red-200 dark:border-red-900/40' : ''}`}>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className={`p-2 rounded-xl ${danger ? 'bg-red-50 dark:bg-red-900/20' : 'bg-primary-50 dark:bg-primary-900/30'}`}>
                    <Icon className={`w-4 h-4 ${danger ? 'text-red-500' : 'text-primary-500'}`} />
                </div>
                <h2 className={`font-bold font-poppins ${danger ? 'text-red-600 dark:text-red-400' : 'text-text-primary dark:text-gray-100'}`}>
                    {title}
                </h2>
            </div>
            {children}
        </div>
    );
}

// ─── Inline Alert ─────────────────────────────────────────────────────────────
function InlineAlert({ type, message }) {
    if (!message) return null;
    const styles = {
        success: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800',
        error:   'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800',
    };
    return (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium mt-2 ${styles[type]}`}>
            {type === 'success' ? <Check className="w-3.5 h-3.5 flex-shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />}
            {message}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SettingsPage() {
    const { user, updateUser, logout } = useAuth();
    const { selectedCareerPath, careers, setSelectedCareerPath } = useUser();
    const navigate = useNavigate();

    // ── A. Account Settings ──────────────────────────────────────────────────
    const [displayName, setDisplayName] = useState(user?.name || '');
    const [accountStatus, setAccountStatus] = useState({ type: '', msg: '' });
    const [savingAccount, setSavingAccount] = useState(false);

    const handleSaveAccount = async () => {
        if (!displayName.trim()) return;
        setSavingAccount(true);
        setAccountStatus({ type: '', msg: '' });
        try {
            await authAPI.getProfile(); // ensure token valid
            const res = await fetch('/api/v1/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('cn_token') || sessionStorage.getItem('cn_token')}`,
                },
                body: JSON.stringify({ name: displayName.trim() }),
            });
            const data = await res.json();
            if (res.ok) {
                updateUser({ name: displayName.trim() });
                setAccountStatus({ type: 'success', msg: 'Display name updated successfully.' });
            } else {
                setAccountStatus({ type: 'error', msg: data.message || 'Failed to update name.' });
            }
        } catch {
            setAccountStatus({ type: 'error', msg: 'Network error. Please try again.' });
        } finally {
            setSavingAccount(false);
        }
    };

    // ── C. Theme Settings ─────────────────────────────────────────────────────
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('cn_theme') === 'dark' ||
            (!localStorage.getItem('cn_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('cn_theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('cn_theme', 'light');
        }
    }, [darkMode]);

    // ── D. Notification Settings ──────────────────────────────────────────────
    const [notifEnabled, setNotifEnabled] = useState(() =>
        localStorage.getItem('cn_notif_enabled') !== 'false'
    );
    const [learningReminders, setLearningReminders] = useState(() =>
        localStorage.getItem('cn_notif_reminders') === 'true'
    );

    const handleNotifEnabled = (val) => {
        setNotifEnabled(val);
        localStorage.setItem('cn_notif_enabled', String(val));
        if (!val) {
            setLearningReminders(false);
            localStorage.setItem('cn_notif_reminders', 'false');
        }
    };
    const handleLearningReminders = (val) => {
        setLearningReminders(val);
        localStorage.setItem('cn_notif_reminders', String(val));
    };

    // ── E. Security — Change Password ─────────────────────────────────────────
    const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
    const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false });
    const [pwStatus, setPwStatus] = useState({ type: '', msg: '' });
    const [savingPw, setSavingPw] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPwStatus({ type: '', msg: '' });

        if (pwForm.next.length < 6) {
            setPwStatus({ type: 'error', msg: 'New password must be at least 6 characters.' });
            return;
        }
        if (pwForm.next !== pwForm.confirm) {
            setPwStatus({ type: 'error', msg: 'New passwords do not match.' });
            return;
        }

        setSavingPw(true);
        try {
            await authAPI.changePassword(pwForm.current, pwForm.next);
            setPwStatus({ type: 'success', msg: 'Password changed successfully.' });
            setPwForm({ current: '', next: '', confirm: '' });
        } catch (err) {
            setPwStatus({ type: 'error', msg: err.message || 'Failed to change password.' });
        } finally {
            setSavingPw(false);
        }
    };

    // ── F. Progress Reset ─────────────────────────────────────────────────────
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [resettingProgress, setResettingProgress] = useState(false);
    const [resetStatus, setResetStatus] = useState({ type: '', msg: '' });

    const handleResetProgress = async () => {
        setResettingProgress(true);
        setResetStatus({ type: '', msg: '' });
        try {
            await progressAPI.resetProgress();
            localStorage.removeItem('cn_progress');
            sessionStorage.removeItem('cn_progress');
            setShowResetConfirm(false);
            setResetStatus({ type: 'success', msg: 'All progress has been reset successfully.' });
        } catch (err) {
            setResetStatus({ type: 'error', msg: err.message || 'Failed to reset progress.' });
        } finally {
            setResettingProgress(false);
        }
    };

    // ── G. Logout ─────────────────────────────────────────────────────────────
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await logout();
            navigate('/login');
        } finally {
            setLoggingOut(false);
        }
    };

    const career = careers.find(c => c.id === user?.career);
    const initials = (user?.name && typeof user.name === 'string')
        ? user.name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'
        : 'U';

    return (
        <DashboardLayout>
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Page header */}
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-text-primary dark:text-gray-100 flex items-center gap-2">
                        <Settings className="w-6 h-6 text-primary-500" />
                        Settings
                    </h1>
                    <p className="text-text-secondary dark:text-gray-400 text-sm mt-1">
                        Manage your account, appearance, and preferences.
                    </p>
                </div>

                {/* ── A. Account Settings ─────────────────────────────────── */}
                <SettingsSection icon={User} title="Account Settings">
                    {/* Avatar preview */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0 shadow-card">
                            <span className="text-primary-900 font-black text-xl font-poppins">{initials}</span>
                        </div>
                        <div>
                            <p className="font-semibold text-text-primary dark:text-gray-100">{user?.name}</p>
                            <p className="text-xs text-text-secondary dark:text-gray-400">{user?.email}</p>
                        </div>
                    </div>

                    {/* Display name field */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="settings-display-name" className="label">Display Name</label>
                            <input
                                id="settings-display-name"
                                type="text"
                                value={displayName}
                                onChange={e => setDisplayName(e.target.value)}
                                className="input-field"
                                placeholder="Your full name"
                                maxLength={50}
                            />
                        </div>
                        <div>
                            <label className="label">Email Address</label>
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600">
                                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span className="text-sm text-text-secondary dark:text-gray-400">{user?.email}</span>
                                <span className="ml-auto badge-gray text-xs">Read-only</span>
                            </div>
                        </div>
                    </div>

                    <InlineAlert type={accountStatus.type} message={accountStatus.msg} />

                    <button
                        id="settings-save-account"
                        onClick={handleSaveAccount}
                        disabled={savingAccount || !displayName.trim()}
                        className="btn-primary mt-4 text-sm py-2 px-5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {savingAccount ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Check className="w-4 h-4" /> Save Changes</>}
                    </button>
                </SettingsSection>

                {/* ── B. Career Preferences ───────────────────────────────── */}
                <SettingsSection icon={Briefcase} title="Career Preferences">
                    <div className="flex items-center gap-4 py-2">
                        <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex-shrink-0">
                            <Briefcase className="w-5 h-5 text-primary-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-text-secondary dark:text-gray-400">Current Career Path</p>
                            <p className="text-sm font-semibold text-text-primary dark:text-gray-100">
                                {career?.title || selectedCareerPath || 'No career selected'}
                            </p>
                        </div>
                        <Link
                            to="/career"
                            id="settings-change-career"
                            className="btn-ghost text-sm py-1.5 px-3 flex items-center gap-1 flex-shrink-0"
                        >
                            Change <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </SettingsSection>

                {/* ── C. Theme Settings ───────────────────────────────────── */}
                <SettingsSection icon={darkMode ? Moon : Sun} title="Appearance">
                    <div className="flex items-center gap-3 mb-4">
                        {/* Light option */}
                        <button
                            id="settings-theme-light"
                            onClick={() => setDarkMode(false)}
                            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                                !darkMode
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                            }`}
                        >
                            <Sun className={`w-5 h-5 ${!darkMode ? 'text-primary-500' : 'text-gray-400'}`} />
                            <span className={`text-xs font-semibold ${!darkMode ? 'text-primary-500' : 'text-text-secondary dark:text-gray-400'}`}>
                                Light
                            </span>
                            {!darkMode && <Check className="w-3.5 h-3.5 text-primary-500" />}
                        </button>

                        {/* Dark option */}
                        <button
                            id="settings-theme-dark"
                            onClick={() => setDarkMode(true)}
                            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                                darkMode
                                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                            }`}
                        >
                            <Moon className={`w-5 h-5 ${darkMode ? 'text-primary-500' : 'text-gray-400'}`} />
                            <span className={`text-xs font-semibold ${darkMode ? 'text-primary-500' : 'text-text-secondary dark:text-gray-400'}`}>
                                Dark
                            </span>
                            {darkMode && <Check className="w-3.5 h-3.5 text-primary-500" />}
                        </button>
                    </div>
                    <p className="text-xs text-text-secondary dark:text-gray-400">
                        Your theme preference is saved locally and applied on every visit.
                    </p>
                </SettingsSection>

                {/* ── D. Notification Settings ────────────────────────────── */}
                <SettingsSection icon={Bell} title="Notifications">
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        <Toggle
                            id="settings-notif-enabled"
                            checked={notifEnabled}
                            onChange={handleNotifEnabled}
                            label="Enable Notifications"
                            description="Receive in-app alerts and updates"
                        />
                        <Toggle
                            id="settings-notif-reminders"
                            checked={learningReminders && notifEnabled}
                            onChange={handleLearningReminders}
                            label="Learning Reminders"
                            description="Daily nudges to keep up with your roadmap"
                        />
                    </div>
                    <p className="text-xs text-text-secondary dark:text-gray-400 mt-3">
                        Notification preferences are stored locally on this device.
                    </p>
                </SettingsSection>

                {/* ── E. Security Settings ────────────────────────────────── */}
                <SettingsSection icon={Shield} title="Security">
                    <form onSubmit={handleChangePassword} className="space-y-3" id="settings-change-password-form">
                        <p className="text-sm text-text-secondary dark:text-gray-400 mb-4">
                            Update your password. You'll need to enter your current password to confirm.
                        </p>

                        {/* Current password */}
                        <div>
                            <label htmlFor="settings-pw-current" className="label">Current Password</label>
                            <div className="relative">
                                <input
                                    id="settings-pw-current"
                                    type={showPw.current ? 'text' : 'password'}
                                    value={pwForm.current}
                                    onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))}
                                    className="input-field pr-10"
                                    placeholder="Enter current password"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setShowPw(s => ({ ...s, current: !s.current }))}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPw.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* New password */}
                        <div>
                            <label htmlFor="settings-pw-new" className="label">New Password</label>
                            <div className="relative">
                                <input
                                    id="settings-pw-new"
                                    type={showPw.next ? 'text' : 'password'}
                                    value={pwForm.next}
                                    onChange={e => setPwForm(f => ({ ...f, next: e.target.value }))}
                                    className="input-field pr-10"
                                    placeholder="Min 6 characters"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setShowPw(s => ({ ...s, next: !s.next }))}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPw.next ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm new password */}
                        <div>
                            <label htmlFor="settings-pw-confirm" className="label">Confirm New Password</label>
                            <div className="relative">
                                <input
                                    id="settings-pw-confirm"
                                    type={showPw.confirm ? 'text' : 'password'}
                                    value={pwForm.confirm}
                                    onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))}
                                    className="input-field pr-10"
                                    placeholder="Repeat new password"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setShowPw(s => ({ ...s, confirm: !s.confirm }))}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPw.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <InlineAlert type={pwStatus.type} message={pwStatus.msg} />

                        <button
                            id="settings-pw-submit"
                            type="submit"
                            disabled={savingPw || !pwForm.current || !pwForm.next || !pwForm.confirm}
                            className="btn-primary text-sm py-2 px-5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {savingPw ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating…</> : <><Shield className="w-4 h-4" /> Change Password</>}
                        </button>
                    </form>
                </SettingsSection>

                {/* ── F. Progress Settings ─────────────────────────────────── */}
                <SettingsSection icon={RotateCcw} title="Progress" danger>
                    <p className="text-sm text-text-secondary dark:text-gray-400 mb-4">
                        Permanently delete all your skill progress records for every career path.
                        This action <strong>cannot be undone</strong>.
                    </p>

                    <InlineAlert type={resetStatus.type} message={resetStatus.msg} />

                    {!showResetConfirm ? (
                        <button
                            id="settings-reset-progress-btn"
                            onClick={() => setShowResetConfirm(true)}
                            className="mt-3 flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-red-500 border-2 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                        >
                            <RotateCcw className="w-4 h-4" /> Reset All Progress
                        </button>
                    ) : (
                        <div className="mt-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 space-y-3">
                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                <p className="text-sm font-semibold">Are you sure? This cannot be undone.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    id="settings-reset-confirm"
                                    onClick={handleResetProgress}
                                    disabled={resettingProgress}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-all disabled:opacity-60"
                                >
                                    {resettingProgress
                                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Resetting…</>
                                        : <><RotateCcw className="w-4 h-4" /> Yes, Reset</>}
                                </button>
                                <button
                                    id="settings-reset-cancel"
                                    onClick={() => setShowResetConfirm(false)}
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </SettingsSection>

                {/* ── G. Account Actions ──────────────────────────────────── */}
                <SettingsSection icon={LogOut} title="Account Actions" danger>
                    <p className="text-sm text-text-secondary dark:text-gray-400 mb-4">
                        Sign out of your account on this device. Your progress and settings will be saved.
                    </p>

                    {!showLogoutConfirm ? (
                        <button
                            id="settings-logout-btn"
                            onClick={() => setShowLogoutConfirm(true)}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-red-500 border-2 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    ) : (
                        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 space-y-3">
                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                <p className="text-sm font-semibold">Are you sure you want to logout?</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    id="settings-logout-confirm"
                                    onClick={handleLogout}
                                    disabled={loggingOut}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-all disabled:opacity-60"
                                >
                                    {loggingOut
                                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Logging out…</>
                                        : <><LogOut className="w-4 h-4" /> Logout</>}
                                </button>
                                <button
                                    id="settings-logout-cancel"
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </SettingsSection>

            </div>
        </DashboardLayout>
    );
}
