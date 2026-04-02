import { useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth} from '../store/AuthContext';
import { useUser} from '../store/UserContext';
import { skillsAPI} from '../services/api';
import { CheckSquare, Square, ArrowRight, Sparkles, CheckCircle2} from 'lucide-react';
import clsx from 'clsx';

export default function SkillAssessmentPage() {
 const { user} = useAuth();
 const { saveKnownSkills} = useUser();
 const [categories, setCategories] = useState({});
 const [selected, setSelected] = useState(new Set());
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const navigate = useNavigate();

 useEffect(() => {
 if (user?.career) {
 skillsAPI.getAssessmentSkills(user.career).then(data => {
 setCategories(data);
 // Pre-select known skills
 if (user.knownSkills?.length > 0) {
 setSelected(new Set(user.knownSkills));
}
 setLoading(false);
});
} else {
 navigate('/career');
}
}, [user?.career]);

 const toggle = (id) => {
 setSelected(prev => {
 const next = new Set(prev);
 next.has(id) ? next.delete(id) : next.add(id);
 return next;
});
};

 const selectAll = (ids) => setSelected(prev => { const n = new Set(prev); ids.forEach(id => n.add(id)); return n;});
 const deselectAll = (ids) => setSelected(prev => { const n = new Set(prev); ids.forEach(id => n.delete(id)); return n;});

 const totalSkills = Object.values(categories).flat().length;
 const selectedCount = selected.size;

 const handleAnalyze = async () => {
 setSaving(true);
 await saveKnownSkills([...selected]);
 setSaving(false);
 navigate('/roadmap');
};

 if (loading) {
 return (
 <DashboardLayout>
 <div className="flex items-center justify-center h-64">
 <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"/>
 </div>
 </DashboardLayout>
 );
}

 return (
 <DashboardLayout>
 <div className="max-w-4xl mx-auto">
 {/* Header */}
 <div className="text-center mb-10">
 <div className="inline-flex items-center gap-2 badge-teal px-4 py-1.5 mb-4 text-sm">
 <Sparkles className="w-3.5 h-3.5"/> Step 2 of 3
 </div>
 <h1 className="text-3xl font-bold font-poppins text-text-primary mb-3">
 Skill Self-Assessment
 </h1>
 <p className="text-text-secondary max-w-lg mx-auto">
 Check off skills you already know. We'll analyze your gaps and generate the perfect roadmap.
 </p>
 </div>

 {/* Progress pill */}
 <div className="flex items-center justify-between mb-6">
 <p className="text-sm text-text-secondary">
 <span className="font-bold text-primary-500">{selectedCount}</span> of {totalSkills} skills selected
 </p>
 {selectedCount === 0 ? (
 <button onClick={() => navigate('/roadmap')} className="text-sm text-text-secondary hover:text-primary-500 underline">
 Skip assessment
 </button>
 ) : null}
 </div>

 {/* Skill categories */}
 <div className="space-y-6 mb-8">
 {Object.entries(categories).map(([category, skills]) => {
 const catIds = skills.map(s => s.id);
 const allSelected = catIds.every(id => selected.has(id));
 const someSelected = catIds.some(id => selected.has(id));

 return (
 <div key={category} className="card">
 <div className="flex items-center justify-between mb-4">
 <div className="flex items-center gap-3">
 <h3 className="font-bold text-text-primary font-poppins">{category}</h3>
 <span className="badge-gray">{skills.filter(s => selected.has(s.id)).length}/{skills.length}</span>
 </div>
 <button
 onClick={() => allSelected ? deselectAll(catIds) : selectAll(catIds)}
 className="text-xs font-medium text-primary-500 hover:underline"
 >
 {allSelected ? 'Deselect all' : 'Select all'}
 </button>
 </div>

 <div className="grid sm:grid-cols-2 gap-2">
 {skills.map(skill => {
 const checked = selected.has(skill.id);
 return (
 <button
 key={skill.id}
 onClick={() => toggle(skill.id)}
 className={clsx(
 'flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all duration-150',
 checked
 ? 'border-primary-500 bg-primary-50 '
 : 'border-gray-200 bg-white hover:border-primary-300'
 )}
 >
 {checked
 ? <CheckSquare className="w-4 h-4 text-primary-500 flex-shrink-0"/>
 : <Square className="w-4 h-4 text-gray-300 flex-shrink-0"/>
}
 <span className={clsx('text-sm font-medium', checked ? 'text-primary-600 ' : 'text-text-primary ')}>
 {skill.name}
 </span>
 </button>
 );
})}
 </div>
 </div>
 );
})}
 </div>

 {/* Analyze button */}
 <div className="flex justify-center">
 <button onClick={handleAnalyze} disabled={saving} className="btn-primary px-10 py-3.5 text-base disabled:opacity-50">
 {saving ? (
 <span className="flex items-center gap-2">
 <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
 Analyzing gaps...
 </span>
 ) : (
 <>
 <CheckCircle2 className="w-5 h-5"/>
 Analyze My Skill Gap <ArrowRight className="w-4 h-4"/>
 </>
 )}
 </button>
 </div>

 {selectedCount === totalSkills && (
 <div className="mt-4 text-center badge-success mx-auto px-4 py-2 inline-flex gap-2 rounded-xl">
 <CheckCircle2 className="w-4 h-4"/>
 All skills known! Roadmap will show advanced content.
 </div>
 )}
 </div>
 </DashboardLayout>
 );
}
