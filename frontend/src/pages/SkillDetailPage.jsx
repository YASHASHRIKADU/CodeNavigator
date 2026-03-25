import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import ResourceList from '../components/ResourceList';
import { useUser } from '../store/UserContext';
import { useAuth } from '../store/AuthContext';
import { skillsAPI, roadmapAPI } from '../services/api';
import { ArrowLeft, CheckCircle2, Clock, Circle, BookOpen, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const statusConfig = {
    'not-started': { label: 'Not Started', icon: Circle, color: 'text-gray-400', btnClass: 'badge-gray' },
    'in-progress': { label: 'In Progress', icon: Clock, color: 'text-amber-500', btnClass: 'badge-warning' },
    'completed': { label: 'Completed', icon: CheckCircle2, color: 'text-success', btnClass: 'badge-success' },
};

const difficultyColors = {
    Beginner: 'bg-primary-50 dark:bg-primary-900/30 text-primary-500',
    Intermediate: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600',
    Advanced: 'bg-red-50 dark:bg-red-900/30 text-red-600',
};

export default function SkillDetailPage() {
    const { skillId } = useParams();
    const { user } = useAuth();
    const { getSkillStatus, updateSkillProgress } = useUser();
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        
        async function fetchSkillData() {
            try {
                // Fetch skill from backend
                const skillData = await skillsAPI.getSkillDetail(skillId);
                if (!skillData) {
                    if (isMounted) { setSkill(null); setLoading(false); }
                    return;
                }

                // If user has a career, find next skills in roadmap
                let nextSkills = [];
                if (user?.career) {
                    const roadmap = await roadmapAPI.getRoadmap(user.career);
                    if (roadmap) {
                        const allSkills = roadmap.stages.flatMap(stage => 
                            stage.skills.map(s => s.skillId)
                        );
                        const currentIndex = allSkills.indexOf(skillId);
                        if (currentIndex !== -1) {
                            nextSkills = allSkills.slice(currentIndex + 1, currentIndex + 3);
                        }
                    }
                }
                
                if (isMounted) {
                    setSkill({ ...skillData, nextSkills });
                    setLoading(false);
                }
            } catch (err) {
                console.error('Failed to load skill', err);
                if (isMounted) { setSkill(null); setLoading(false); }
            }
        }
        
        fetchSkillData();
        return () => { isMounted = false; };
    }, [skillId, user?.career]);

    const status = getSkillStatus(skillId);
    const cfg = statusConfig[status];
    const StatusIcon = cfg.icon;

    const handleStatusChange = async (newStatus) => {
        if (status === newStatus || updating) return;
        setUpdating(true);
        try {
            await updateSkillProgress(skillId, newStatus);
        } catch (err) {
            console.error('Failed to update status', err);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    if (!skill) {
        return (
            <DashboardLayout>
                <div className="text-center py-20">
                    <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <h2 className="font-bold text-text-primary dark:text-gray-100 mb-2">Skill Not Found</h2>
                    <p className="text-text-secondary dark:text-gray-400 mb-4">This skill detail page is coming soon!</p>
                    <button onClick={() => navigate(-1)} className="btn-secondary text-sm">
                        <ArrowLeft className="w-4 h-4" /> Go Back
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Breadcrumb */}
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-secondary dark:text-gray-400 hover:text-primary-500 transition-colors text-sm group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Roadmap
                </button>

                {/* Skill header card */}
                <div className="card bg-gradient-to-br from-primary-500 to-teal-600 text-white overflow-hidden relative">
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
                    <div className="relative">
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs bg-white/20 px-3 py-0.5 rounded-full">{skill.category}</span>
                                    <span className={clsx('text-xs px-3 py-0.5 rounded-full bg-white/20')}>
                                        {skill.difficulty}
                                    </span>
                                </div>
                                <h1 className="text-2xl font-bold font-poppins">{skill.name}</h1>
                            </div>
                            <div className={clsx('badge', status === 'completed' ? 'bg-white/20 text-white' : status === 'in-progress' ? 'bg-amber-400/20 text-amber-200' : 'bg-white/10 text-white/70')}>
                                <StatusIcon className={clsx('w-3.5 h-3.5 mr-1', cfg.color)} />
                                {cfg.label}
                            </div>
                        </div>

                        <p className="text-white/80 leading-relaxed mb-4 text-sm">{skill.description}</p>

                        <div className="flex gap-2">
                            {skill.duration && <span className="text-xs bg-white/10 px-3 py-1 rounded-full">⏱ {skill.duration}</span>}
                            {skill.prerequisites?.length > 0 && (
                                <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
                                    Prereq: {skill.prerequisites.length}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status update */}
                <div className="card">
                    <h3 className="font-bold text-text-primary dark:text-gray-100 font-poppins mb-4">Update Your Status</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {Object.entries(statusConfig).map(([key, cfg]) => {
                            const Icon = cfg.icon;
                            const active = status === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleStatusChange(key)}
                                    disabled={updating}
                                    className={clsx(
                                        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-150 disabled:opacity-50',
                                        active
                                            ? key === 'completed' ? 'border-success bg-success/10' : key === 'in-progress' ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-400 bg-gray-50 dark:bg-gray-700'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 bg-white dark:bg-card-dark'
                                    )}
                                >
                                    <Icon className={clsx('w-5 h-5', active ? cfg.color : 'text-gray-400')} />
                                    <span className={clsx('text-xs font-semibold', active ? 'text-text-primary dark:text-gray-100' : 'text-text-secondary dark:text-gray-400')}>
                                        {cfg.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Resources */}
                <div className="card">
                    <h3 className="font-bold text-text-primary dark:text-gray-100 font-poppins mb-4">
                        Learning Resources
                    </h3>
                    <ResourceList resources={skill.resources} />
                </div>

                {/* Next skills */}
                {skill.nextSkills?.length > 0 && (
                    <div className="card">
                        <h3 className="font-bold text-text-primary dark:text-gray-100 font-poppins mb-4">Next Steps</h3>
                        <div className="flex flex-wrap gap-2">
                            {skill.nextSkills.map(id => (
                                <Link key={id} to={`/skill/${id}`} className="flex items-center gap-1.5 badge-teal px-3 py-1.5 hover:bg-primary-100 dark:hover:bg-primary-800/40 transition-colors">
                                    {id.replace(/-/g, ' ')} <ArrowRight className="w-3 h-3" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
