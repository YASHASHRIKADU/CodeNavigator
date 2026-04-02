import { useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { domainAPI, roadmapAPI} from '../services/api';
import { useAuth} from '../store/AuthContext';
import { useUser} from '../store/UserContext';
import { ArrowRight, Sparkles, Loader2} from 'lucide-react';

export default function CustomCareerBuilder() {
 const navigate = useNavigate();
 const { updateUser} = useAuth();
 const { setSelectedCareerPath} = useUser();
 const [loading, setLoading] = useState(false);

 // ── Domain list – loaded from backend on mount ────────────────────────────
 const [domains, setDomains] = useState([]);
 const [domainsLoading, setDomainsLoading] = useState(true);

 // ── Career paths for the selected domain ─────────────────────────────────
 const [careerPaths, setCareerPaths] = useState([]);
 const [pathsLoading, setPathsLoading] = useState(false);

 const [formData, setFormData] = useState({
 domain: '',
 careerPath: '',
 level: 'Beginner',
});

 const levels = ['Beginner', 'Intermediate', 'Advanced'];

 // Fetch the domain list once on mount
 useEffect(() => {
 let cancelled = false;
 setDomainsLoading(true);
 domainAPI.getDomains()
 .then((data) => {
 if (cancelled) return;
 setDomains(data);
 // Initialise form with the first domain once we have real data
 if (data.length > 0) {
 setFormData(prev => ({ ...prev, domain: data[0]}));
}
})
 .catch((err) => {
 console.error('Failed to load domains:', err);
})
 .finally(() => {
 if (!cancelled) setDomainsLoading(false);
});
 return () => { cancelled = true;};
}, []);

 // Fetch career paths whenever the selected domain changes
 useEffect(() => {
 if (!formData.domain) return;

 let cancelled = false;
 setPathsLoading(true);
 setCareerPaths([]);
 setFormData(prev => ({ ...prev, careerPath: ''}));

 domainAPI.getCareerPaths(formData.domain)
 .then((data) => {
 if (cancelled) return;
 setCareerPaths(data);
 // Auto-select the first career path for convenience
 if (data.length > 0) {
 setFormData(prev => ({ ...prev, careerPath: data[0]}));
}
})
 .catch((err) => {
 console.error('Failed to load career paths:', err);
})
 .finally(() => {
 if (!cancelled) setPathsLoading(false);
});

 return () => { cancelled = true;};
}, [formData.domain]);

 const handleChange = (e) => {
 setFormData({ ...formData, [e.target.name]: e.target.value});
};

 const handleSubmit = async (e) => {
 e.preventDefault();

 if (!formData.domain || !formData.careerPath) {
 alert('Domain and Career Path must not be empty.');
 return;
}

 if (!formData.level) {
 alert('Skill Level must not be empty.');
 return;
}

 setLoading(true);
 console.log("Roadmap request payload:", formData);
 
 try {
 const res = await roadmapAPI.generateRoadmap({
 domain: formData.domain,
 careerPath: formData.careerPath,
 level: formData.level,
});
 console.log("Roadmap response:", res);
 
 // Instantly update global react context so the next page reacts!
 if (res?.data?.career) {
 updateUser({ career: res.data.career});
 if (res.data.careerPath) setSelectedCareerPath(res.data.careerPath);
}
 navigate('/roadmap');
} catch (error) {
 console.error("Roadmap generation error:", error);
 const errorMessage = error?.payload?.message || error?.message || 'Failed to generate roadmap. Please try again.';
 alert(errorMessage);
 setLoading(false);
}
};

 return (
 <DashboardLayout>
 <div className="max-w-3xl mx-auto py-8">
 <div className="text-center mb-10">
 <div className="inline-flex items-center gap-2 badge-teal px-4 py-1.5 mb-4 text-sm">
 <Sparkles className="w-3.5 h-3.5"/>
 Custom Builder
 </div>
 <h1 className="text-3xl font-bold font-poppins text-text-primary mb-3">
 Build Your Custom Path
 </h1>
 <p className="text-text-secondary">
 Tell us what you want to learn, and we'll generate a personalized learning roadmap.
 </p>
 </div>

 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
 <form onSubmit={handleSubmit} className="space-y-6">

 {/* Domain */}
 <div>
 <label className="block text-sm font-medium text-text-primary mb-2">
 Domain <span className="text-red-500">*</span>
 </label>
 {domainsLoading ? (
 <div className="flex items-center gap-2 text-text-secondary text-sm py-3">
 <Loader2 className="w-4 h-4 animate-spin"/>
 Loading domains…
 </div>
 ) : (
 <select
 name="domain"
 value={formData.domain}
 onChange={handleChange}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none appearance-none"
 required
 >
 {domains.map(dom => (
 <option key={dom} value={dom}>{dom}</option>
 ))}
 </select>
 )}
 </div>

 {/* Career Path */}
 <div>
 <label className="block text-sm font-medium text-text-primary mb-2">
 Career Path <span className="text-red-500">*</span>
 </label>
 {pathsLoading ? (
 <div className="flex items-center gap-2 text-text-secondary text-sm py-3">
 <Loader2 className="w-4 h-4 animate-spin"/>
 Loading career paths…
 </div>
 ) : (
 <select
 name="careerPath"
 value={formData.careerPath}
 onChange={handleChange}
 disabled={careerPaths.length === 0}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none appearance-none disabled:opacity-50"
 required
 >
 {careerPaths.map(path => (
 <option key={path} value={path}>{path}</option>
 ))}
 </select>
 )}
 <p className="text-xs text-text-secondary mt-2">
 Three curated career paths per domain, loaded from the backend.
 </p>
 </div>

 {/* Level */}
 <div>
 <label className="block text-sm font-medium text-text-primary mb-2">
 Skill Level
 </label>
 <select
 name="level"
 value={formData.level}
 onChange={handleChange}
 className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-text-primary focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none appearance-none"
 >
 {levels.map(lvl => (
 <option key={lvl} value={lvl}>{lvl}</option>
 ))}
 </select>
 </div>

 {/* Submit */}
 <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
 <button
 type="button"
 onClick={() => navigate('/career')}
 className="px-6 py-3 font-semibold text-text-secondary hover:text-text-primary :text-white transition-colors"
 >
 Cancel
 </button>
 <button
 type="submit"
 disabled={loading || domainsLoading || pathsLoading || !formData.careerPath}
 className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
 >
 {loading ? (
 <>
 <Loader2 className="w-5 h-5 animate-spin"/>
 Generating...
 </>
 ) : (
 <>
 Generate Roadmap <ArrowRight className="w-5 h-5"/>
 </>
 )}
 </button>
 </div>
 </form>
 </div>
 </div>
 </DashboardLayout>
 );
}
