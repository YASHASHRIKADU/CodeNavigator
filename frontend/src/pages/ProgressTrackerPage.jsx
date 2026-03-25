import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import SkillCard from '../components/SkillCard';
import ProgressBar from '../components/ProgressBar';
import { roadmapAPI } from '../services/api';
import { useAuth } from '../store/AuthContext';
import { useUser } from '../store/UserContext';
import { TrendingUp, Filter } from 'lucide-react';
import clsx from 'clsx';

const FILTERS = ['All', 'Not Started', 'In Progress', 'Completed'];

export default function ProgressTrackerPage() {
    const { user } = useAuth();
    const { careers, getSkillStatus, updateSkillProgress, getCompletionStats } = useUser();
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.career) { navigate('/career'); return; }
        roadmapAPI.getRoadmap(user.career).then(data => {
            setRoadmap(data);
            setLoading(false);
        });
    }, [user?.career]);

    const career = careers.find(c => c.id === user?.career);
    const stats = roadmap ? getCompletionStats(roadmap) : { completed: 0, inProgress: 0, total: 0, percentage: 0 };

    const filterMap = {
        'All': null, 'Not Started': 'not-started', 'In Progress': 'in-progress', 'Completed': 'completed'
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

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-text-primary dark:text-gray-100">Progress Tracker</h1>
                    <p className="text-text-secondary dark:text-gray-400 text-sm mt-1">
                        {career?.title} — Mark skills to track your learning journey
                    </p>
                </div>

                {/* Overall progress */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-text-primary dark:text-gray-100 font-poppins">Overall Completion</h3>
                        <span className="text-2xl font-black text-primary-500 font-poppins">{stats.percentage}%</span>
                    </div>
                    <ProgressBar value={stats.completed} max={stats.total || 1} showPercent={false} size="lg" />
                    <div className="flex items-center gap-6 mt-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-success" />
                            <span className="text-text-secondary dark:text-gray-400">{stats.completed} Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-amber-400" />
                            <span className="text-text-secondary dark:text-gray-400">{stats.inProgress} In Progress</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                            <span className="text-text-secondary dark:text-gray-400">{stats.total - stats.completed - stats.inProgress} Not Started</span>
                        </div>
                    </div>
                </div>

                {/* Filter bar */}
                <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-4 h-4 text-text-secondary dark:text-gray-400" />
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={clsx(
                                'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150',
                                filter === f
                                    ? 'bg-primary-500 text-white shadow-sm'
                                    : 'bg-white dark:bg-card-dark text-text-secondary dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-primary-300'
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Skills by stage */}
                {roadmap?.stages.map(stage => {
                    const filteredSkills = filter === 'All'
                        ? stage.skills
                        : stage.skills.filter(s => getSkillStatus(s.skillId) === filterMap[filter]);

                    if (filteredSkills.length === 0) return null;

                    const done = stage.skills.filter(s => getSkillStatus(s.skillId) === 'completed').length;
                    const pct = Math.round((done / stage.skills.length) * 100);

                    return (
                        <div key={stage.id} className="card">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-text-primary dark:text-gray-100 font-poppins">
                                    Stage {stage.stage}: {stage.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-primary-500">{pct}%</span>
                                    <span className="badge-gray">{done}/{stage.skills.length}</span>
                                </div>
                            </div>
                            <div className="h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                                <div className="h-full bg-primary-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {filteredSkills.map(skill => (
                                    <SkillCard
                                        key={skill.skillId}
                                        skill={skill}
                                        status={getSkillStatus(skill.skillId)}
                                        onStatusChange={updateSkillProgress}
                                        linkTo={`/skill/${skill.skillId}`}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </DashboardLayout>
    );
}
