import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Restore session on mount (checks both localStorage and sessionStorage)
        const stored = authAPI.getStoredUser();
        if (stored) setUser(stored);
        setLoading(false);
    }, []);

    /**
     * login — passes rememberMe through to authAPI so it can choose
     * the correct storage. Existing callers that omit rememberMe default to false.
     */
    const login = async (email, password, rememberMe = false) => {
        const result = await authAPI.login(email, password, rememberMe);
        if (result.success) setUser(result.user);
        return result;
    };

    const signup = async (name, email, password) => {
        const result = await authAPI.signup(name, email, password);
        if (result.success) setUser(result.user);
        return result;
    };

    const logout = async () => {
        await authAPI.logout();
        setUser(null);
        // Clear progress too
        localStorage.removeItem('cn_progress');
        sessionStorage.removeItem('cn_progress');
    };

    const updateUser = (updated) => {
        const merged = { ...user, ...updated };
        // Write back to whichever storage holds the active session
        const storage = localStorage.getItem('cn_token') ? localStorage : sessionStorage;
        storage.setItem('cn_user', JSON.stringify(merged));
        setUser(merged);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
