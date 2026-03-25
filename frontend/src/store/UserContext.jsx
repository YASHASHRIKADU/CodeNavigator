import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { progressAPI, careerAPI, skillsAPI } from '../services/api';
import { useAuth } from './AuthContext';

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const { user, updateUser } = useAuth();
    const [progress, setProgress] = useState({});
    const [roadmap, setRoadmap] = useState(null);
    const [loadingProgress, setLoadingProgress] = useState(false);
    const [careers, setCareers] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [selectedCareerPath, setSelectedCareerPathState] = useState(() => localStorage.getItem('selectedCareerPath') || '');

    const setSelectedCareerPath = (path) => {
        setSelectedCareerPathState(path);
        if (path) {
            localStorage.setItem('selectedCareerPath', path);
        } else {
            localStorage.removeItem('selectedCareerPath');
        }
    };

    useEffect(() => {
        careerAPI.getCareers().then(setCareers).catch(console.error);
        skillsAPI.getAllSkills().then(setAllSkills).catch(console.error);
    }, []);

    useEffect(() => {
        if (user?.id) {
            // Load progress scoped to the user's selected career path
            progressAPI.getProgress(user.id, user.career || '').then(setProgress);
        }
    }, [user?.id, user?.career]);

    const selectCareer = async (careerId) => {
        const result = await careerAPI.selectCareer(user.id, careerId);
        if (result.success) {
            updateUser({ career: careerId });
            setSelectedCareerPath('');
            // Reset progress on career change
            setProgress({});
            localStorage.removeItem('cn_progress');
        }
        return result;
    };

    const saveKnownSkills = async (skillIds) => {
        const result = await skillsAPI.saveKnownSkills(user.id, skillIds, user.career || '');
        if (result.success) {
            // Pre-mark known skills as completed in the flat progress map
            const updatedProgress = { ...progress };
            skillIds.forEach(id => {
                updatedProgress[id] = 'completed'; // flat string to match backend map format
            });
            setProgress(updatedProgress);
            localStorage.setItem('cn_progress', JSON.stringify(updatedProgress));
            updateUser({ knownSkills: skillIds });
        }
        return result;
    };

    const updateSkillProgress = async (skillId, status) => {
        // Optimistic update — patch the single skill in the flat progress map
        setProgress(prev => ({ ...prev, [skillId]: status }));
        try {
            // Pass the user's career as roadmapId to scope this update
            const result = await progressAPI.updateProgress(user?.id, skillId, status, user?.career || '');
            return result;
        } catch (err) {
            // Rollback this skill's status on API failure
            setProgress(prev => {
                const reverted = { ...prev };
                delete reverted[skillId];
                return reverted;
            });
            console.error('Failed to update skill progress:', err);
            throw err;
        }
    };

    const getSkillStatus = useCallback((skillId) => {
        // progress is a flat map: { skillId: 'completed' | 'in-progress' | 'not-started' }
        return progress[skillId] || 'not-started';
    }, [progress]);

    const getCompletionStats = useCallback((roadmapData) => {
        if (!roadmapData) return { completed: 0, inProgress: 0, total: 0, percentage: 0 };
        const allSkills = roadmapData.stages.flatMap(s => s.skills);
        const total = allSkills.length;
        const completed = allSkills.filter(s => getSkillStatus(s.skillId) === 'completed').length;
        const inProgress = allSkills.filter(s => getSkillStatus(s.skillId) === 'in-progress').length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { completed, inProgress, total, percentage };
    }, [getSkillStatus]);

    return (
        <UserContext.Provider value={{
            progress, loadingProgress, careers, allSkills,
            selectCareer, saveKnownSkills, updateSkillProgress,
            getSkillStatus, getCompletionStats, selectedCareerPath, setSelectedCareerPath
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error('useUser must be used inside UserProvider');
    return ctx;
}
