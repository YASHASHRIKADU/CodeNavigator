import clsx from 'clsx';
import { TrendingUp } from 'lucide-react';

export default function DashboardStats({ stats = [] }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
                const Icon = stat.icon || TrendingUp;
                return (
                    <div key={idx} className="card group hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-medium text-text-secondary dark:text-gray-400 mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-text-primary dark:text-gray-100 font-poppins">{stat.value}</p>
                                {stat.sub && (
                                    <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">{stat.sub}</p>
                                )}
                            </div>
                            <div className={clsx(
                                'p-2.5 rounded-xl flex-shrink-0',
                                stat.colorClass || 'bg-primary-50 dark:bg-primary-900/30'
                            )}>
                                <Icon className={clsx('w-5 h-5', stat.iconColor || 'text-primary-500')} />
                            </div>
                        </div>
                        {stat.progress !== undefined && (
                            <div className="mt-3 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary-500 to-success rounded-full transition-all duration-700"
                                    style={{ width: `${stat.progress}%` }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
