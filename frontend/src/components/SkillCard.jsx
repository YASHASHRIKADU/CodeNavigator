import clsx from 'clsx';
import { CheckCircle2, Clock, Circle} from 'lucide-react';
import { Link} from 'react-router-dom';
import { useState} from 'react';

const statusConfig = {
 'completed': { label: 'Completed', badgeClass: 'badge-success', icon: CheckCircle2, color: 'text-success'},
 'in-progress': { label: 'In Progress', badgeClass: 'badge-warning', icon: Clock, color: 'text-amber-500'},
 'not-started': { label: 'Not Started', badgeClass: 'badge-gray', icon: Circle, color: 'text-gray-400'},
};

const difficultyColor = {
 Beginner: 'badge-teal',
 Intermediate: 'badge-warning',
 Advanced: 'bg-red-100 text-red-600 badge',
};

export default function SkillCard({ skill, status = 'not-started', onStatusChange, linkTo}) {
 const cfg = statusConfig[status] || statusConfig['not-started'];
 const StatusIcon = cfg.icon;
 const [updating, setUpdating] = useState(false);

 const content = (
 <div className={clsx(
 'card group transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5',
 status === 'completed' && 'border-l-4 border-l-success',
 status === 'in-progress' && 'border-l-4 border-l-amber-400',
 status === 'not-started' && 'border-l-4 border-l-transparent',
 )}>
 <div className="flex items-start justify-between gap-3">
 <div className="flex items-start gap-3 min-w-0">
 <StatusIcon className={clsx('w-5 h-5 flex-shrink-0 mt-0.5', cfg.color)} />
 <div className="min-w-0">
 <h3 className="font-semibold text-sm text-text-primary font-poppins truncate">
 {skill.name}
 </h3>
 <div className="flex items-center gap-2 mt-1 flex-wrap">
 <span className="text-xs text-text-secondary">{skill.category}</span>
 {skill.difficulty && (
 <span className={clsx(difficultyColor[skill.difficulty] || 'badge-gray', 'text-xs')}>
 {skill.difficulty}
 </span>
 )}
 </div>
 </div>
 </div>
 <span className={clsx(cfg.badgeClass, 'flex-shrink-0 hidden sm:flex')}>
 {cfg.label}
 </span>
 </div>

 {onStatusChange && (
 <div className="mt-3 pt-3 border-t border-gray-100">
 <div className="flex gap-1.5">
 {Object.entries(statusConfig).map(([key, val]) => (
 <button
 key={key}
 onClick={async (e) => { 
 e.preventDefault(); 
 e.stopPropagation(); 
 if (updating || status === key) return; // Prevent redundant or concurrent calls
 setUpdating(true);
 try {
 await onStatusChange(skill.skillId, key); 
} catch (err) {
 console.error('Error updating status:', err);
} finally {
 setUpdating(false);
}
}}
 disabled={updating}
 className={clsx(
 'flex-1 text-xs py-1 px-2 rounded-lg font-medium transition-all duration-150',
 updating ? 'opacity-50 cursor-not-allowed' : '',
 status === key
 ? key === 'completed' ? 'bg-success text-white' : key === 'in-progress' ? 'bg-amber-400 text-white' : 'bg-gray-300 text-gray-700 '
 : 'bg-gray-100 text-gray-500 hover:bg-gray-200 :bg-gray-600'
 )}
 >
 {val.label.split(' ')[0]}
 </button>
 ))}
 </div>
 </div>
 )}
 </div>
 );

 if (linkTo) {
 return <Link to={linkTo} className="block">{content}</Link>;
}
 return content;
}
