/**
 * API Service Layer (Production Ready)
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ─── Helpers ────────────────────────────────────────────────────────────────
const getToken = () =>
    localStorage.getItem('cn_token') || sessionStorage.getItem('cn_token');

const headers = (extra = {}) => ({
    'Content-Type': 'application/json',
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    ...extra,
});

const request = async (path, options = {}) => {
    const res = await fetch(`${BASE_URL}/api/v1${path}`, {
        ...options,
        headers: headers(options.headers),
    });

    let data;
    try {
        data = await res.json();
    } catch {
        data = { message: 'Invalid server response' };
    }

    if (!res.ok) {
        const err = new Error(data.message || 'API request failed');
        err.status = res.status;
        err.payload = data;
        throw err;
    }

    return data;
};

// ─── Auth APIs ──────────────────────────────────────────────────────────────
export const authAPI = {
    async signup(name, email, password) {
        return await request('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
    },

    async login(email, password, rememberMe = false) {
        const data = await request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        const userPayload = JSON.stringify({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            career: data.user.careerGoal || null,
            knownSkills: [],
            progress: {},
        });

        if (rememberMe) {
            localStorage.setItem('cn_token', data.token);
            localStorage.setItem('cn_user', userPayload);
            sessionStorage.clear();
        } else {
            // Preserve selectedCareerPath before wiping localStorage
            const savedCareerPath = localStorage.getItem('selectedCareerPath');
            sessionStorage.setItem('cn_token', data.token);
            sessionStorage.setItem('cn_user', userPayload);
            localStorage.clear();
            // Restore it so the UI shows the correct career without needing a refresh
            if (savedCareerPath) {
                localStorage.setItem('selectedCareerPath', savedCareerPath);
            }
        }

        return { success: true, user: data.user };
    },

    async logout() {
        localStorage.clear();
        sessionStorage.clear();
        return { success: true };
    },

    async getProfile() {
        return await request('/auth/profile');
    },

    getStoredUser() {
        const token =
            localStorage.getItem('cn_token') ||
            sessionStorage.getItem('cn_token');

        const stored =
            localStorage.getItem('cn_user') ||
            sessionStorage.getItem('cn_user');

        if (token && stored) {
            try {
                return JSON.parse(stored);
            } catch {
                return null;
            }
        }

        return null;
    },
};

// ─── Career APIs ────────────────────────────────────────────────────────────
export const careerAPI = {
    async getCareers() {
        const data = await request('/careers');
        return data.data;
    },

    async selectCareer(careerId) {
        await request('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify({ careerGoal: careerId }),
        });

        const stored =
            localStorage.getItem('cn_user') ||
            sessionStorage.getItem('cn_user');

        if (stored) {
            const user = JSON.parse(stored);
            user.career = careerId;
            const storage = localStorage.getItem('cn_token')
                ? localStorage
                : sessionStorage;
            storage.setItem('cn_user', JSON.stringify(user));
        }

        return { success: true };
    },
};

// ─── Domain APIs ────────────────────────────────────────────────────────────
export const domainAPI = {
    async getDomains() {
        const data = await request('/domains');
        return data.data;
    },

    async getCareerPaths(domain) {
        const data = await request(
            `/domains/${encodeURIComponent(domain)}/career-paths`
        );
        return data.data;
    },
};

// ─── Roadmap APIs ───────────────────────────────────────────────────────────
export const roadmapAPI = {
    async getRoadmap(careerId) {
        try {
            const data = await request(`/roadmap/${careerId}`);
            return data.data;
        } catch (err) {
            if (err.status === 404) return null;
            throw err;
        }
    },

    async generateRoadmap(payload) {
        return await request('/roadmap/generate', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    },
};

// ─── Skills APIs ────────────────────────────────────────────────────────────
export const skillsAPI = {
    async getAllSkills() {
        const data = await request('/skills');
        return data.data;
    },

    async getAssessmentSkills(careerId) {
        const data = await request(`/roadmap/${careerId}`);
        const roadmap = data.data;

        const grouped = {};
        roadmap.stages.forEach(stage => {
            grouped[stage.title] = stage.skills.map(s => ({
                id: s.skillId,
                name: s.name,
            }));
        });

        return grouped;
    },

    async getSkillDetail(skillId) {
        try {
            const data = await request(`/skills/${skillId}`);
            return data.data;
        } catch (err) {
            if (err.status === 404) return null;
            throw err;
        }
    },

    // Mark a set of skill IDs as 'completed' in bulk (used by Skill Assessment page)
    async saveKnownSkills(skillIds, roadmapId = '') {
        const progressMap = {};
        skillIds.forEach(id => { progressMap[id] = 'completed'; });
        return await request('/progress/bulk', {
            method: 'POST',
            body: JSON.stringify({ progress: progressMap, roadmapId }),
        });
    },
};

// ─── Progress APIs ──────────────────────────────────────────────────────────
export const progressAPI = {
    async getProgress(roadmapId = '') {
        const qs = roadmapId
            ? `?roadmapId=${encodeURIComponent(roadmapId)}`
            : '';
        const data = await request(`/progress${qs}`);
        return data.data;
    },

    async updateProgress(skillId, status, roadmapId = '') {
        const data = await request('/progress', {
            method: 'POST',
            body: JSON.stringify({ skillId, status, roadmapId }),
        });
        return data.data;
    },

    async resetProgress(roadmapId = '') {
        const qs = roadmapId
            ? `?roadmapId=${encodeURIComponent(roadmapId)}`
            : '';
        return await request(`/progress${qs}`, { method: 'DELETE' });
    },
};

// ─── Resources APIs ─────────────────────────────────────────────────────────
export const resourcesAPI = {
    async getResources(career) {
        try {
            const data = await request(
                `/resources/${encodeURIComponent(career)}`
            );
            return Array.isArray(data.data) ? data.data : [];
        } catch (err) {
            if (err.status === 404) return [];
            throw err;
        }
    },
};
