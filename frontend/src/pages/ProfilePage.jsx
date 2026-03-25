import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { ProgressRing } from '../components/ProgressBar';
import { useAuth } from '../store/AuthContext';
import { useUser } from '../store/UserContext';
import { roadmapAPI } from '../services/api';
import { User, Mail, Calendar, Briefcase, Edit3, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuth();
    const { careers, getCompletionStats } = useUser();
    const [roadmap, setRoadmap] = useState(null);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.career) roadmapAPI.getRoadmap(user.career).then(setRoadmap);
    }, [user?.career]);

    const career = careers.find(c => c.id === user?.career);
    const stats = roadmap ? getCompletionStats(roadmap) : { completed: 0, inProgress: 0, total: 0, percentage: 0 };
    const initials = (user?.name && typeof user.name === 'string') ? user.name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0,2) || 'U' : 'U';
    const joinedDate = user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'Recently';

    const profileStats = [
        { label: 'Completed Skills', value: stats.completed, icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10' },
        { label: 'In Progress', value: stats.inProgress, icon: Award, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/20' },
        { label: 'Total Skills', value: stats.total, icon: Award, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        { label: 'Completion', value: `${stats.percentage}%`, icon: CheckCircle2, color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-900/30' },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto space-y-6">

                {/* Profile header card */}
                <div className="relative card overflow-hidden">
                    {/* Banner */}
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-primary-500 to-teal-500" />

                    <div className="relative pt-12 pb-2">
                        {/* Avatar */}
                        <div className="relative inline-block">
                            <div className="w-20 h-20 rounded-2xl bg-accent border-4 border-white dark:border-card-dark flex items-center justify-center shadow-card">
                                <span className="text-primary-900 font-black text-2xl font-poppins">{initials}</span>
                            </div>
                            {stats.percentage === 100 && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-white">
                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div>

                        <div className="mt-3">
                            <h1 className="text-2xl font-bold font-poppins text-text-primary dark:text-gray-100">{user?.name}</h1>
                            {career && (
                                <span className="badge-teal mt-1 inline-flex">{career.title}</span>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => setEditing(!editing)}
                        className="absolute top-28 right-6 btn-ghost text-sm py-1.5 px-3 flex items-center gap-1.5"
                    >
                        <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                    </button>
                </div>

                {/* Info card */}
                <div className="card space-y-4">
                    <h3 className="font-bold text-text-primary dark:text-gray-100 font-poppins">Account Information</h3>

                    {[
                        { icon: User, label: 'Full Name', value: user?.name },
                        { icon: Mail, label: 'Email', value: user?.email },
                        { icon: Briefcase, label: 'Career Path', value: career?.title || 'Not selected yet' },
                        { icon: Calendar, label: 'Member Since', value: joinedDate },
                    ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-4 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                            <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex-shrink-0">
                                <Icon className="w-4 h-4 text-primary-500" />
                            </div>
                            <div>
                                <p className="text-xs text-text-secondary dark:text-gray-400">{label}</p>
                                <p className="text-sm font-semibold text-text-primary dark:text-gray-100">{value}</p>
                            </div>
                        </div>
                    ))}

                    {!user?.career && (
                        <Link to="/career" className="btn-primary text-sm py-2 px-4 w-full justify-center">
                            Choose Career Path <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>

                {/* Progress stats */}
                {user?.career && (
                    <div className="card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-text-primary dark:text-gray-100 font-poppins">Learning Progress</h3>
                            <Link to="/progress" className="text-primary-500 text-sm font-semibold hover:underline flex items-center gap-1">
                                Track <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <ProgressRing value={stats.completed} max={stats.total || 1} size={120} strokeWidth={10} sublabel="completed" />
                            <div className="grid grid-cols-2 gap-4 flex-1">
                                {profileStats.map(s => {
                                    const Icon = s.icon;
                                    return (
                                        <div key={s.label} className={`rounded-xl p-4 ${s.bg} flex items-center gap-3`}>
                                            <Icon className={`w-5 h-5 ${s.color}`} />
                                            <div>
                                                <p className="text-lg font-black text-text-primary dark:text-gray-100 font-poppins">{s.value}</p>
                                                <p className="text-xs text-text-secondary dark:text-gray-400">{s.label}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Danger zone */}
                <div className="card border border-red-100 dark:border-red-900/30">
                    <h3 className="font-bold text-text-primary dark:text-gray-100 font-poppins mb-2">Career Path</h3>
                    <p className="text-text-secondary dark:text-gray-400 text-sm mb-4">
                        Want to switch your career path? This will reset your progress tracking.
                    </p>
                    <Link to="/career" className="btn-secondary text-sm py-2 px-4 inline-flex border-gray-300 text-gray-600 dark:text-gray-300 hover:border-primary-400 hover:text-primary-500">
                        Change Career Path
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}
