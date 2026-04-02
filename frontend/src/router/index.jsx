import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider} from '../store/AuthContext';
import { UserProvider} from '../store/UserContext';
import { ProtectedRoute, PublicOnlyRoute} from './guards';

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import DashboardPage from '../pages/DashboardPage';
import CareerSelectionPage from '../pages/CareerSelectionPage';
import SkillAssessmentPage from '../pages/SkillAssessmentPage';
import RoadmapPage from '../pages/RoadmapPage';
import SkillDetailPage from '../pages/SkillDetailPage';
import ProgressTrackerPage from '../pages/ProgressTrackerPage';
import ProfilePage from '../pages/ProfilePage';
import ResourcesPage from '../pages/ResourcesPage';
import SettingsPage from '../pages/SettingsPage';

import CustomCareerBuilder from '../pages/CustomCareerBuilder';


export default function AppRouter() {
 return (
 <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true}}>
 <AuthProvider>
 <UserProvider>
 <Routes>
 {/* Public */}
 <Route path="/"element={<HomePage />} />

 {/* Auth only (redirect to /dashboard if logged in) */}
 <Route element={<PublicOnlyRoute />}>
 <Route path="/login"element={<LoginPage />} />
 <Route path="/signup"element={<SignupPage />} />
 </Route>

 {/* Publicly accessible password-reset routes */}
 <Route path="/forgot-password"element={<ForgotPasswordPage />} />
 <Route path="/reset-password"element={<ResetPasswordPage />} />


 {/* Protected routes */}
 <Route element={<ProtectedRoute />}>
 <Route path="/dashboard"element={<DashboardPage />} />
 <Route path="/career"element={<CareerSelectionPage />} />
 <Route path="/custom-career"element={<CustomCareerBuilder />} />
 <Route path="/assessment"element={<SkillAssessmentPage />} />
 <Route path="/roadmap"element={<RoadmapPage />} />
 <Route path="/skill/:skillId"element={<SkillDetailPage />} />
 <Route path="/progress"element={<ProgressTrackerPage />} />
 <Route path="/profile"element={<ProfilePage />} />
 <Route path="/resources"element={<ResourcesPage />} />
 <Route path="/settings"element={<SettingsPage />} />
 </Route>

 {/* Fallback */}
 <Route path="*"element={<Navigate to="/"replace />} />
 </Routes>
 </UserProvider>
 </AuthProvider>
 </BrowserRouter>
 );
}
