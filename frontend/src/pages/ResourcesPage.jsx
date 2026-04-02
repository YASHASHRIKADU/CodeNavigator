import { useState, useEffect} from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import ResourceList from '../components/ResourceList';
import { BookOpen, Loader2} from 'lucide-react';
import { useUser} from '../store/UserContext';
import { useAuth} from '../store/AuthContext';
import { resourcesAPI} from '../services/api';



export default function ResourcesPage() {
 const { user} = useAuth();
 const { selectedCareerPath} = useUser();
 
 const [filteredSections, setFilteredSections] = useState([]);
 const [isLoading, setIsLoading] = useState(false);

 const activeCareer = selectedCareerPath || user?.career || '';

 useEffect(() => {
 // Clear previous state before loading new data
 setFilteredSections([]);

 if (!activeCareer) {
 return;
}

 const fetchResources = async () => {
 setIsLoading(true);
 try {
 console.log("Fetching resources for:", activeCareer);
 const data = await resourcesAPI.getResources(activeCareer);
 console.log("Resources loaded:", data);
 setFilteredSections(data || []);
} catch (error) {
 console.error("Failed to load resources:", error);
 setFilteredSections([]);
} finally {
 setIsLoading(false);
}
};

 fetchResources();
}, [activeCareer]);

 return (
 <DashboardLayout>
 <div className="max-w-4xl mx-auto space-y-6">
 <div>
 <h1 className="text-2xl font-bold font-poppins text-text-primary">Learning Resources</h1>
 <p className="text-text-secondary text-sm mt-1">Curated free and premium resources for your selected career path.</p>
 </div>

 {!activeCareer ? (
 <div className="card text-center py-12">
 <BookOpen className="w-12 h-12 mx-auto text-gray-500 mb-4 opacity-50"/>
 <h3 className="text-lg font-bold text-gray-300">No Career Selected</h3>
 <p className="text-gray-500 mt-2">Please select a career path to view tailored resources.</p>
 </div>
 ) : isLoading ? (
 <div className="flex items-center justify-center py-12">
 <Loader2 className="w-10 h-10 text-primary-500 animate-spin"/>
 </div>
 ) : filteredSections.length === 0 ? (
 <div className="card text-center py-12">
 <BookOpen className="w-12 h-12 mx-auto text-gray-500 mb-4 opacity-50"/>
 <h3 className="text-lg font-bold text-gray-300">No resources available for this career path</h3>
 <p className="text-gray-500 mt-2">Check back later as we continuously add more learning materials.</p>
 </div>
 ) : (
 filteredSections.map(section => (
 <div key={section.category} className="card">
 <div className="flex items-center gap-2 mb-4">
 <BookOpen className="w-5 h-5 text-primary-500"/>
 <h3 className="font-bold text-text-primary font-poppins">{section.category}</h3>
 </div>
 <ResourceList resources={section.items} />
 </div>
 ))
 )}
 </div>
 </DashboardLayout>
 );
}
