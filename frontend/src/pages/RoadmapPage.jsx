import { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import RoadmapCard from '../components/RoadmapCard';
import ProgressBar from '../components/ProgressBar';
import { roadmapAPI} from '../services/api';
import { useAuth} from '../store/AuthContext';
import { useUser} from '../store/UserContext';
import { Map, ArrowRight} from 'lucide-react';
import { Link} from 'react-router-dom';

export default function RoadmapPage() {
 const { user} = useAuth();
 const { careers, getCompletionStats} = useUser();
 const [roadmap, setRoadmap] = useState(null);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();

 useEffect(() => {
 if (!user?.career) { navigate('/career'); return;}
 // Clear previous roadmap data to prevent displaying outdated skills
 setLoading(true);
 setRoadmap(null);
 roadmapAPI.getRoadmap(user.career).then(data => {
 setRoadmap(data);
 setLoading(false);
});
}, [user?.career, navigate]);

 const career = careers.find(c => c.id === user?.career);
 const stats = roadmap ? getCompletionStats(roadmap) : { completed: 0, total: 0, percentage: 0};

 if (loading) {
 return (
 <DashboardLayout>
 <div className="flex items-center justify-center h-64">
 <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"/>
 </div>
 </DashboardLayout>
 );
}

 if (!roadmap) {
 return (
 <DashboardLayout>
 <div className="text-center py-20">
 <Map className="w-12 h-12 mx-auto text-gray-300 mb-4"/>
 <p className="text-text-secondary">No roadmap found. Please select a career path first.</p>
 <Link to="/career"className="btn-primary mt-4 inline-flex">Go to Career Selection</Link>
 </div>
 </DashboardLayout>
 );
}

 return (
 <DashboardLayout>
 <div className="max-w-4xl mx-auto space-y-6">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <div className="flex items-center gap-2 mb-1">
 <span className="badge-teal">{career?.title}</span>
 <span className="badge-gray">{roadmap.totalSkills} total skills</span>
 </div>
 <h1 className="text-2xl font-bold font-poppins text-text-primary">{roadmap.title}</h1>
 </div>
 <Link to="/progress"className="btn-secondary text-sm py-2 px-4">
 Track Progress <ArrowRight className="w-4 h-4"/>
 </Link>
 </div>

 {/* Overall progress bar */}
 <div className="card">
 <ProgressBar
 value={stats.completed}
 max={stats.total || 1}
 label={`${stats.completed} of ${stats.total} skills completed`}
 size="lg"
 />
 </div>

 {/* Stages */}
 <div className="space-y-4">
 {roadmap.stages.map((stage, idx) => (
 <RoadmapCard key={stage.stage || idx} stage={stage} index={idx} />
 ))}
 </div>

 {stats.percentage === 100 && (
 <div className="card text-center py-8 bg-gradient-to-br from-success/10 to-primary-500/10 border-2 border-success/30">
 <div className="text-5xl mb-4">🎉</div>
 <h2 className="text-xl font-bold font-poppins text-text-primary mb-2">Roadmap Completed!</h2>
 <p className="text-text-secondary">Congratulations! You've completed all skills in this roadmap.</p>
 </div>
 )}
 </div>
 </DashboardLayout>
 );
}
