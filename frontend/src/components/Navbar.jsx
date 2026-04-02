import { useState, useEffect, useRef, useMemo} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Bell, Search, ChevronDown, Map as MapIcon, Target} from 'lucide-react';
import { useAuth} from '../store/AuthContext';
import { useUser} from '../store/UserContext';
import { careerAPI, skillsAPI} from '../services/api';
import clsx from 'clsx';

export default function Navbar() {
 const { user, logout} = useAuth();
 const { selectCareer, careers, allSkills, selectedCareerPath} = useUser();
 const navigate = useNavigate();
 
 const [showUserMenu, setShowUserMenu] = useState(false);
 const [searchQuery, setSearchQuery] = useState('');
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const searchRef = useRef(null);

 const careerLabel = selectedCareerPath || careers?.find(c => c.id === user?.career)?.title || 'No career selected';
 const initials = (user?.name && typeof user.name === 'string') 
 ? user.name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0,2) || 'U'
 : 'U';

 const handleLogout = async () => {
 await logout();
 navigate('/login');
};

 // Close menus on outside click
 useEffect(() => {
 const handleClickOutside = (e) => {
 if (searchRef.current && !searchRef.current.contains(e.target)) {
 setIsDropdownOpen(false);
}
 setShowUserMenu(false);
};
 document.addEventListener('click', handleClickOutside);
 return () => document.removeEventListener('click', handleClickOutside);
}, []);



 // Perform search filtering
 const searchResults = useMemo(() => {
 if (!searchQuery.trim()) return { roadmaps: [], skills: []};
 
 const query = searchQuery.toLowerCase();
 
 const filteredRoadmaps = careers.filter(c => 
 c.title.toLowerCase().includes(query) || 
 (c.tags && c.tags.some(t => t.toLowerCase().includes(query)))
 );
 
 const filteredSkills = allSkills.filter(s => 
 s.skillName.toLowerCase().includes(query) ||
 s.category.toLowerCase().includes(query)
 );

 return {
 roadmaps: filteredRoadmaps.slice(0, 4), // limit to top 4
 skills: filteredSkills.slice(0, 6) // limit to top 6
};
}, [searchQuery, allSkills]);

 const handleSearchSelect = async (type, item) => {
 setIsDropdownOpen(false);
 setSearchQuery('');
 
 if (type === 'roadmap') {
 await selectCareer(item.id);
 navigate('/roadmap');
} else if (type === 'skill') {
 navigate(`/skill/${item.skillId}`);
}
};

 const hasResults = searchResults.roadmaps.length > 0 || searchResults.skills.length > 0;

 return (
 <header className="h-16 flex-shrink-0 bg-white border-b border-gray-100 flex items-center px-4 lg:px-6 gap-4 z-30">
 {/* Left: page space for mobile hamburger */}
 <div className="w-10 lg:w-0 flex-shrink-0"/>

 {/* Search */}
 <div className="flex-1 max-w-md relative"ref={searchRef}>
 <div className="relative">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
 <input
 type="text"
 placeholder="Search skills, roadmaps..."
 value={searchQuery}
 onChange={(e) => {
 setSearchQuery(e.target.value);
 setIsDropdownOpen(true);
}}
 onFocus={() => {
 if (searchQuery.trim()) setIsDropdownOpen(true);
}}
 className="w-full pl-9 pr-4 py-2 rounded-xl bg-bg-light border-none text-sm text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
 />
 </div>
 
 {/* Search Dropdown */}
 {isDropdownOpen && searchQuery.trim() && (
 <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-card border border-gray-100 py-3 animate-fade-in z-50 overflow-hidden">
 {!hasResults ? (
 <div className="px-4 py-6 text-center text-sm text-text-secondary">
 No matching roadmaps or skills found.
 </div>
 ) : (
 <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
 {/* Roadmaps Section */}
 {searchResults.roadmaps.length > 0 && (
 <div className="mb-2">
 <div className="px-4 py-1.5 text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
 Roadmaps
 </div>
 {searchResults.roadmaps.map(r => (
 <button 
 key={r.id}
 onClick={() => handleSearchSelect('roadmap', r)}
 className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-bg-light :bg-primary-900/30 transition-colors"
 >
 <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center flex-shrink-0">
 <MapIcon className="w-4 h-4"/>
 </div>
 <div>
 <p className="text-sm font-semibold text-text-primary">{r.title}</p>
 <p className="text-xs text-text-secondary truncate">{r.tags?.join(', ') || r.description}</p>
 </div>
 </button>
 ))}
 </div>
 )}
 
 {/* Skills Section */}
 {searchResults.skills.length > 0 && (
 <div>
 <div className="px-4 py-1.5 text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">
 Skills
 </div>
 {searchResults.skills.map(s => (
 <button 
 key={s.id}
 onClick={() => handleSearchSelect('skill', s)}
 className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-bg-light :bg-primary-900/30 transition-colors"
 >
 <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
 <Target className="w-4 h-4"/>
 </div>
 <p className="text-sm font-medium text-text-primary">{s.skillName}</p>
 </button>
 ))}
 </div>
 )}
 </div>
 )}
 </div>
 )}
 </div>

 <div className="flex items-center gap-2 ml-auto">
 {/* Notifications */}
 <button className="p-2 rounded-xl text-gray-500 hover:bg-bg-light transition-all relative">
 <Bell className="w-5 h-5"/>
 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full"/>
 </button>

 {/* User avatar menu */}
 <div className="relative"onClick={e => e.stopPropagation()}>
 <button
 onClick={() => setShowUserMenu(!showUserMenu)}
 className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-bg-light :bg-primary-900/30 transition-all"
 >
 <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
 <span className="text-white font-bold text-xs">{initials}</span>
 </div>
 <div className="hidden sm:block text-left">
 <p className="text-xs font-semibold text-text-primary leading-none">{user?.name}</p>
 <p className="text-xs text-text-secondary truncate max-w-[120px]">{careerLabel}</p>
 </div>
 <ChevronDown className={clsx('w-4 h-4 text-gray-400 transition-transform', showUserMenu && 'rotate-180')} />
 </button>

 {showUserMenu && (
 <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-card border border-gray-100 py-2 animate-fade-in z-50">
 <Link to="/profile"className="flex items-center gap-2 px-4 py-2 text-sm text-text-primary hover:bg-bg-light :bg-primary-900/30 transition-colors">
 Profile
 </Link>
 <Link to="/career"className="flex items-center gap-2 px-4 py-2 text-sm text-text-primary hover:bg-bg-light :bg-primary-900/30 transition-colors">
 Change Career
 </Link>
 <Link to="/settings"className="flex items-center gap-2 px-4 py-2 text-sm text-text-primary hover:bg-bg-light :bg-primary-900/30 transition-colors">
 Settings
 </Link>
 </div>
 )}
 </div>
 </div>
 </header>
 );
}
