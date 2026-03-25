import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../store/UserContext';
import DashboardLayout from '../layouts/DashboardLayout';
import CareerCard from '../components/CareerCard';
import { careerAPI } from '../services/api';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

export default function CareerSelectionPage() {
    const { user } = useAuth();
    const { selectCareer } = useUser();
    const [careers, setCareers] = useState([]);
    const [selected, setSelected] = useState(user?.career || null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        careerAPI.getCareers().then(setCareers).catch(console.error);
    }, []);

    const handleSelect = async () => {
        if (!selected) return;
        setLoading(true);
        await selectCareer(selected);
        setLoading(false);
        navigate('/assessment');
    };

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 badge-teal px-4 py-1.5 mb-4 text-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        Step 1 of 3
                    </div>
                    <h1 className="text-3xl font-bold font-poppins text-text-primary dark:text-gray-100 mb-3">
                        Choose Your Career Goal
                    </h1>
                    <p className="text-text-secondary dark:text-gray-400 max-w-lg mx-auto">
                        Select the tech career you want to pursue. We'll generate a personalized learning roadmap just for you.
                    </p>
                </div>

                {/* Career grid */}
                <div className="grid sm:grid-cols-2 gap-5 mb-8">
                    {careers.map(career => (
                        <CareerCard
                            key={career.id}
                            career={career}
                            selected={selected === career.id}
                            onClick={(c) => setSelected(c.id)}
                        />
                    ))}

                    {/* Choose Your Own Career Path Card */}
                    <CareerCard
                        key="custom-path"
                        career={{
                            id: 'custom-career-builder',
                            title: 'Choose Your Own Career Path',
                            icon: '✨',
                            description: 'Create a personalized career roadmap based on your interests and technologies you want to learn.',
                            skills: 'Custom',
                            duration: 'Flexible',
                            difficulty: 'All Levels',
                            tags: ['Personalized', 'AI Generated', 'Custom']
                        }}
                        selected={selected === 'custom-career-builder'}
                        onClick={() => navigate('/custom-career')}
                    />
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSelect}
                        disabled={!selected || loading}
                        className="btn-primary px-10 py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Generating path...
                            </span>
                        ) : (
                            <>Continue to Skill Assessment <ArrowRight className="w-5 h-5" /></>
                        )}
                    </button>
                </div>

                {selected && (
                    <p className="text-center text-sm text-text-secondary dark:text-gray-400 mt-3">
                        Selected: <strong className="text-primary-500">{careers.find(c => c.id === selected)?.title}</strong>
                    </p>
                )}
            </div>
        </DashboardLayout>
    );
}
