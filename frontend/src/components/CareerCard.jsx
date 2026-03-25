import clsx from 'clsx';
import { ArrowRight, Clock, Layers } from 'lucide-react';

export default function CareerCard({ career, selected, onClick }) {
    return (
        <button
            onClick={() => onClick(career)}
            className={clsx(
                'w-full text-left rounded-2xl p-6 border-2 transition-all duration-300 group relative overflow-hidden',
                selected
                    ? 'border-primary-500 bg-primary-500 text-white shadow-glow scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-card-dark hover:border-primary-300 hover:shadow-card-hover hover:-translate-y-1'
            )}
        >
            {/* Background gradient blob */}
            <div className={clsx(
                'absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl opacity-20 transition-opacity duration-300',
                selected ? 'opacity-30 bg-white' : 'opacity-0 group-hover:opacity-20 bg-primary-500'
            )} />

            {/* Icon */}
            <div className={clsx(
                'text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block',
            )}>
                {career.icon}
            </div>

            {/* Title */}
            <h3 className={clsx(
                'text-lg font-bold font-poppins mb-2',
                selected ? 'text-white' : 'text-text-primary dark:text-gray-100'
            )}>
                {career.title}
            </h3>

            {/* Description */}
            <p className={clsx(
                'text-sm mb-4 leading-relaxed',
                selected ? 'text-white/80' : 'text-text-secondary dark:text-gray-400'
            )}>
                {career.description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                    <Layers className={clsx('w-3.5 h-3.5', selected ? 'text-accent' : 'text-primary-500')} />
                    <span className={clsx('text-xs font-medium', selected ? 'text-white/80' : 'text-text-secondary dark:text-gray-400')}>
                        {career.skills} skills
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className={clsx('w-3.5 h-3.5', selected ? 'text-accent' : 'text-primary-500')} />
                    <span className={clsx('text-xs font-medium', selected ? 'text-white/80' : 'text-text-secondary dark:text-gray-400')}>
                        {career.duration}
                    </span>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
                {career.tags.map(tag => (
                    <span
                        key={tag}
                        className={clsx(
                            'text-xs px-2 py-0.5 rounded-full font-medium',
                            selected ? 'bg-white/20 text-white' : 'bg-primary-50 dark:bg-primary-900/30 text-primary-500 dark:text-primary-300'
                        )}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* CTA */}
            <div className={clsx(
                'flex items-center gap-1 text-sm font-semibold transition-all duration-200',
                selected ? 'text-accent' : 'text-primary-500 group-hover:gap-2'
            )}>
                {selected ? '✓ Selected' : career.id === 'custom-career-builder' ? 'Create Custom Path' : 'Select Path'}
                {!selected && <ArrowRight className="w-4 h-4" />}
            </div>
        </button>
    );
}
