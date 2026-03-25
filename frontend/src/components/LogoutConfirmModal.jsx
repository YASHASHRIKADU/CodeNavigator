import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, X } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

/**
 * LogoutConfirmModal
 *
 * Props:
 *   isOpen   {boolean}   — Whether the modal is visible
 *   onClose  {function}  — Called when user dismisses without logging out
 */
export default function LogoutConfirmModal({ isOpen, onClose }) {
    const { logout } = useAuth();
    const navigate   = useNavigate();

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handler = e => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        await logout();
        navigate('/login');
    };

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-modal-title"
        >
            {/* Blurred overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal card */}
            <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 animate-slide-up">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                        <LogOut className="w-7 h-7 text-red-500" />
                    </div>
                </div>

                {/* Text */}
                <h3
                    id="logout-modal-title"
                    className="text-lg font-bold font-poppins text-center text-text-primary dark:text-gray-100 mb-2"
                >
                    Logout?
                </h3>
                <p className="text-sm text-text-secondary dark:text-gray-400 text-center mb-6">
                    Are you sure you want to logout? Your session will end.
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-text-primary dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
