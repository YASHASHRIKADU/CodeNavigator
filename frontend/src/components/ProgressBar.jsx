import clsx from 'clsx';

export default function ProgressBar({ value = 0, max = 100, label, showPercent = true, size = 'md', className}) {
 const pct = Math.min(Math.round((value / max) * 100), 100);
 const heightClass = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4'}[size] || 'h-2.5';

 return (
 <div className={clsx('w-full', className)}>
 {(label || showPercent) && (
 <div className="flex justify-between items-center mb-1.5">
 {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
 {showPercent && (
 <span className="text-sm font-bold text-primary-500">{pct}%</span>
 )}
 </div>
 )}
 <div className={clsx('w-full bg-gray-100 rounded-full overflow-hidden', heightClass)}>
 <div
 className="h-full bg-gradient-to-r from-primary-500 to-success rounded-full transition-all duration-700 ease-out"
 style={{ width: `${pct}%`}}
 />
 </div>
 </div>
 );
}

// Circular progress ring component
export function ProgressRing({ value = 0, max = 100, size = 100, strokeWidth = 8, label, sublabel}) {
 const pct = Math.min(Math.round((value / max) * 100), 100);
 const radius = (size - strokeWidth) / 2;
 const circumference = 2 * Math.PI * radius;
 const offset = circumference - (pct / 100) * circumference;

 return (
 <div className="relative inline-flex items-center justify-center">
 <svg width={size} height={size} className="-rotate-90">
 {/* Track */}
 <circle
 cx={size / 2} cy={size / 2} r={radius}
 fill="none"stroke="currentColor"strokeWidth={strokeWidth}
 className="text-gray-100"
 />
 {/* Fill */}
 <circle
 cx={size / 2} cy={size / 2} r={radius}
 fill="none"strokeWidth={strokeWidth}
 stroke="url(#ring-gradient)"
 strokeLinecap="round"
 strokeDasharray={circumference}
 strokeDashoffset={offset}
 className="transition-all duration-700 ease-out"
 />
 <defs>
 <linearGradient id="ring-gradient"x1="0%"y1="0%"x2="100%"y2="0%">
 <stop offset="0%"stopColor="#004643"/>
 <stop offset="100%"stopColor="#2CB67D"/>
 </linearGradient>
 </defs>
 </svg>
 <div className="absolute text-center">
 <div className="text-xl font-black text-text-primary font-poppins">{pct}%</div>
 {sublabel && <div className="text-xs text-text-secondary">{sublabel}</div>}
 </div>
 </div>
 );
}
