import clsx from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import SkillCard from './SkillCard';
import { useUser } from '../store/UserContext';

export default function RoadmapCard({ stage, index }) {
    const [open, setOpen] = useState(index === 0);
    const { getSkillStatus, updateSkillProgress } = useUser();

    const completed = stage.skills.filter(s => getSkillStatus(s.skillId) === 'completed').length;
    const total = stage.skills.length;
    const pct = Math.round((completed / total) * 100);

    const stageColors = [
        'from-blue-500 to-cyan-400',
        'from-yellow-400 to-amber-400',
        'from-primary-500 to-teal-400',
        'from-accent to-orange-400',
    ];
    const gradient = stageColors[index % stageColors.length];

    return (
        <div className="card overflow-hidden transition-all duration-300">
            {/* Stage header */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-4 w-full text-left"
            >
                {/* Stage badge */}
                <div className={clsx(
                    'w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-md',
                    gradient
                )}>
                    <span className="text-white font-black text-lg font-poppins">{stage.stage}</span>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-text-primary dark:text-gray-100 font-poppins">{stage.title}</h3>
                        <span className="badge-teal">{completed}/{total} done</span>
                    </div>
                    <p className="text-sm text-text-secondary dark:text-gray-400 mt-0.5">{stage.description}</p>

                    {/* Mini progress bar */}
                    <div className="mt-2 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary-500 to-success rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                </div>

                <div className="flex-shrink-0 text-gray-400">
                    {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
            </button>

            {/* Skills inside */}
            {open && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                    {stage.skills.map(skill => (
                        <SkillCard
                            key={skill.skillId}
                            skill={skill}
                            status={getSkillStatus(skill.skillId)}
                            onStatusChange={updateSkillProgress}
                            linkTo={`/skill/${skill.skillId}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
