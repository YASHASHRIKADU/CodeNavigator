import { Navigate, Outlet} from 'react-router-dom';
import { useAuth} from '../store/AuthContext';

export function ProtectedRoute() {
 const { user, loading} = useAuth();

 if (loading) {
 return (
 <div className="min-h-screen bg-bg-light flex items-center justify-center">
 <div className="flex flex-col items-center gap-4">
 <div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"/>
 <p className="text-text-secondary text-sm">Loading...</p>
 </div>
 </div>
 );
}

 return user ? <Outlet /> : <Navigate to="/login"replace />;
}

export function PublicOnlyRoute() {
 const { user, loading} = useAuth();
 if (loading) return null;
 return user ? <Navigate to="/dashboard"replace /> : <Outlet />;
}
