import { useEffect, useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth} from '../store/AuthContext';
import { useUser} from '../store/UserContext';
import DashboardLayout from '../layouts/DashboardLayout';
import { ProgressRing} from '../components/ProgressBar';
import DashboardStats from '../components/DashboardStats';
import { roadmapAPI} from '../services/api';
import { ArrowRight, Target, CheckCircle2, Clock, BookOpen, Flame} from 'lucide-react';
import clsx from 'clsx';

export default function DashboardPage() {
 const { user} = useAuth();
 const { careers, getSkillStatus, getCompletionStats} = useUser();
 const [roadmap, setRoadmap] = useState(null);
 const navigate = useNavigate();

 useEffect(() => {
 if (user?.career) {
 roadmapAPI.getRoadmap(user.career).then(setRoadmap);
}
}, [user?.career]);

 const career = careers.find(c => c.id === user?.career);
 const stats = roadmap ? getCompletionStats(roadmap) : { completed: 0, inProgress: 0, total: 0, percentage: 0};

 const statCards = [
 { label: 'Completed Skills', value: stats.completed, icon: CheckCircle2, colorClass: 'bg-success/10', iconColor: 'text-success', progress: undefined},
 { label: 'In Progress', value: stats.inProgress, icon: Clock, colorClass: 'bg-amber-100 ', iconColor: 'text-amber-500'},
 { label: 'Total Skills', value: stats.total, icon: BookOpen, colorClass: 'bg-blue-50 ', iconColor: 'text-blue-500'},
 { label: 'Day Streak', value: '5 🔥', icon: Flame, colorClass: 'bg-orange-50 ', iconColor: 'text-orange-500'},
 ];

 // Find next skill to learn
 let nextSkill = null;
 if (roadmap) {
 for (const stage of roadmap.stages) {
 for (const skill of stage.skills) {
 if (getSkillStatus(skill.skillId) === 'not-started') {
 nextSkill = { ...skill, stageName: stage.title};
 break;
}
}
 if (nextSkill) break;
}
}

 // Recent activity: last 5 in-progress or completed
 const recentActivity = [];
 if (roadmap) {
 for (const stage of roadmap.stages) {
 for (const skill of stage.skills) {
 const status = getSkillStatus(skill.skillId);
 if (status !== 'not-started') recentActivity.push({ skill, status});
}
}
}

 return (
 <DashboardLayout>
 <div className="max-w-6xl mx-auto space-y-6">

 {/* Welcome header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold font-poppins text-text-primary">
 Welcome back, {(user?.name && typeof user.name === 'string') ? user.name.split(' ')[0] : 'Learner'} 👋
 </h1>
 <p className="text-text-secondary text-sm mt-1">
 {career ? `${career.title} Path` : 'Select a career path to get started'}
 </p>
 </div>
 {!user?.career && (
 <Link to="/career"className="btn-primary text-sm py-2 px-4">
 Select Career <ArrowRight className="w-4 h-4"/>
 </Link>
 )}
 </div>

 {!user?.career ? (
 /* Empty state */
 <div className="card text-center py-16">
 <div className="text-6xl mb-4">🗺️</div>
 <h2 className="text-xl font-bold font-poppins text-text-primary mb-2">Let's get you started</h2>
 <p className="text-text-secondary mb-6 max-w-sm mx-auto">Choose your career goal and we'll generate a personalized learning roadmap for you.</p>
 <Link to="/career"className="btn-primary mx-auto">Choose Career Path <ArrowRight className="w-4 h-4"/></Link>
 </div>
 ) : (
 <>
 {/* Stats */}
 <DashboardStats stats={statCards} />

 {/* Progress + Next Skill */}
 <div className="grid lg:grid-cols-3 gap-6">
 {/* Progress ring */}
 <div className="card flex flex-col items-center py-8 lg:col-span-1">
 <h2 className="font-bold text-text-primary font-poppins mb-6">Overall Progress</h2>
 <ProgressRing value={stats.completed} max={stats.total || 1} size={140} strokeWidth={12} />
 <p className="text-text-secondary text-sm mt-4 text-center">
 {stats.completed} of {stats.total} skills completed
 </p>
 {stats.percentage === 100 && (
 <div className="mt-4 badge-success px-4 py-1 text-sm">🎉 Roadmap Completed!</div>
 )}
 </div>

 {/* Next skill + Recent activity */}
 <div className="lg:col-span-2 space-y-4">
 {/* Next skill */}
 {nextSkill && (
 <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
 <div className="flex items-start justify-between">
 <div>
 <p className="text-white/70 text-xs font-medium mb-1 uppercase tracking-wide">Next Skill to Learn</p>
 <h3 className="font-bold text-lg font-poppins mb-1">{nextSkill.name}</h3>
 <div className="flex items-center gap-2">
 <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{nextSkill.stageName}</span>
 <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{nextSkill.difficulty}</span>
 </div>
 </div>
 <Target className="w-8 h-8 text-accent flex-shrink-0"/>
 </div>
 <Link to={`/skill/${nextSkill.skillId}`} className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl text-sm font-semibold">
 Start Learning <ArrowRight className="w-4 h-4"/>
 </Link>
 </div>
 )}

 {/* Recent activity */}
 <div className="card">
 <h3 className="font-bold text-text-primary font-poppins mb-4">Recent Activity</h3>
 {recentActivity.length === 0 ? (
 <p className="text-text-secondary text-sm text-center py-4">
 No activity yet. Start your first skill!
 </p>
 ) : (
 <div className="space-y-2">
 {recentActivity.slice(0, 5).map(({ skill, status}) => (
 <div key={skill.skillId} className="flex items-center gap-3 p-2 rounded-xl hover:bg-bg-light :bg-primary-900/20 transition-colors">
 <div className={clsx(
 'w-2 h-2 rounded-full flex-shrink-0',
 status === 'completed' ? 'bg-success' : 'bg-amber-400'
 )} />
 <span className="text-sm text-text-primary flex-1">{skill.name}</span>
 <span className={clsx(
 status === 'completed' ? 'badge-success' : 'badge-warning'
 )}>{status === 'completed' ? 'Completed' : 'In Progress'}</span>
 </div>
 ))}
 </div>
 )}
 <Link to="/progress"className="mt-4 inline-flex items-center gap-1 text-primary-500 text-sm font-semibold hover:gap-2 transition-all">
 View all progress <ArrowRight className="w-4 h-4"/>
 </Link>
 </div>
 </div>
 </div>

 {/* Stage overview */}
 {roadmap && (
 <div className="card">
 <div className="flex items-center justify-between mb-4">
 <h3 className="font-bold text-text-primary font-poppins">Roadmap Stages</h3>
 <Link to="/roadmap"className="text-primary-500 text-sm font-semibold hover:underline">View Full Roadmap</Link>
 </div>
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
 {roadmap.stages.map((stage, idx) => {
 const done = stage.skills.filter(s => getSkillStatus(s.skillId) === 'completed').length;
 const pct = Math.round((done / stage.skills.length) * 100);
 const stageGradients = ['from-blue-500 to-cyan-400', 'from-yellow-400 to-amber-400', 'from-primary-500 to-teal-400', 'from-accent to-orange-400'];
 return (
 <Link to="/roadmap"key={stage.title} className="p-4 rounded-xl bg-bg-light hover:bg-primary-50 :bg-primary-900/30 transition-colors group">
 <div className={clsx('w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm mb-3', stageGradients[idx])}>
 {stage.stage}
 </div>
 <p className="text-xs font-bold text-text-primary mb-2">{stage.title}</p>
 <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
 <div className="h-full bg-primary-500 rounded-full transition-all"style={{ width: `${pct}%`}} />
 </div>
 <p className="text-xs text-text-secondary mt-1">{done}/{stage.skills.length} done</p>
 </Link>
 );
})}
 </div>
 </div>
 )}
 </>
 )}
 </div>
 </DashboardLayout>
 );
}
