import { ExternalLink, BookOpen, Video, Code, FileText} from 'lucide-react';
import clsx from 'clsx';

const typeConfig = {
 docs: { label: 'Documentation', icon: FileText, color: 'text-blue-500 bg-blue-50 '},
 video: { label: 'Video', icon: Video, color: 'text-red-500 bg-red-50 '},
 tutorial: { label: 'Tutorial', icon: BookOpen, color: 'text-primary-500 bg-primary-50 '},
 practice: { label: 'Practice', icon: Code, color: 'text-purple-500 bg-purple-50 '},
};

export default function ResourceList({ resources = []}) {
 if (!resources.length) {
 return (
 <div className="text-center py-8 text-text-secondary">
 <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40"/>
 <p className="text-sm">No resources available yet.</p>
 </div>
 );
}

 return (
 <div className="space-y-3">
 {resources.map((resource, idx) => {
 const cfg = typeConfig[resource.type] || typeConfig.docs;
 const Icon = cfg.icon;

 return (
 <a
 key={resource.url || `resource-${idx}`}
 href={resource.url}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-primary-300 hover:shadow-card transition-all duration-200 group"
 >
 <div className={clsx('p-2 rounded-xl flex-shrink-0', cfg.color)}>
 <Icon className="w-4 h-4"/>
 </div>

 <div className="flex-1 min-w-0">
 <p className="font-medium text-sm text-text-primary group-hover:text-primary-500 transition-colors truncate">
 {resource.title}
 </p>
 <p className="text-xs text-text-secondary mt-0.5">
 {cfg.label} {resource.free && <span className="ml-2 badge-teal text-xs">Free</span>}
 </p>
 </div>

 <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-500 flex-shrink-0 transition-colors"/>
 </a>
 );
})}
 </div>
 );
}
