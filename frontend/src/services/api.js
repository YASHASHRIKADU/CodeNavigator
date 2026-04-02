/**
 * API Service Layer
 *
 * All requests go to /api/v1/... which Vite proxies to the Express backend
 * (http://localhost:5000) in development.
 *
 * In production, use VITE_API_BASE_URL env var to point to your deployed server.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';
// ─── Helpers ──────────────────────────────────────────────────────────────────
/** Read token from either storage (localStorage first, then sessionStorage) */
const getToken = () =>
 localStorage.getItem('cn_token') || sessionStorage.getItem('cn_token');
const headers = (extra = {}) => ({
 'Content-Type': 'application/json',
 ...(getToken() ? { Authorization: `Bearer ${getToken()}`} : {}),
 ...extra,
});
const request = async (path, options = {}) => {
 const res = await fetch(`${BASE_URL}${path}`, {
 ...options,
 headers: headers(options.headers),
});
 const data = await res.json();
 if (!res.ok) {
 const err = new Error(data.message || 'API request failed');
 err.status = res.status;
 err.payload = data;
 throw err;
}
 return data;
};
// ─── Auth APIs ────────────────────────────────────────────────────────────────
export const authAPI = {
 async signup(name, email, password) {
},
 /**
 * Login — if rememberMe is true, token goes to localStorage (persists across
 * browser sessions). If false, token goes to sessionStorage (cleared on tab close).
 */
 async login(email, password, rememberMe = false) {
 const data = await request('/auth/login', {
 method: 'POST',
 body: JSON.stringify({ email, password}),
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
 // Persist across sessions
 localStorage.setItem('cn_token', data.token);
 localStorage.setItem('cn_user', userPayload);
 // Clear any stale sessionStorage entry
 sessionStorage.removeItem('cn_token');
 sessionStorage.removeItem('cn_user');
} else {
 // Only for this tab/session
 sessionStorage.setItem('cn_token', data.token);
 sessionStorage.setItem('cn_user', userPayload);
 // Clear any stale localStorage entry
 localStorage.removeItem('cn_token');
 localStorage.removeItem('cn_user');
}
 return { success: true, user: { ...data.user, career: data.user.careerGoal || null}};
},
 async logout() {
 localStorage.removeItem('cn_token');
 localStorage.removeItem('cn_user');
 sessionStorage.removeItem('cn_token');
 sessionStorage.removeItem('cn_user');
 return { success: true};
},
 getStoredUser() {
 // Check localStorage first (remember me), then sessionStorage
 const token = localStorage.getItem('cn_token') || sessionStorage.getItem('cn_token');
 const stored = localStorage.getItem('cn_user') || sessionStorage.getItem('cn_user');
 if (token && stored) {
 try { return JSON.parse(stored);} catch { return null;}
}
 return null;
},
 async getProfile() {
 return await request('/auth/profile');
},
 async sendOtp(email) {
 return await request('/auth/send-otp', {
 method: 'POST',
 body: JSON.stringify({ email}),
});
},
 async verifyOtp(email, otp) {
 return await request('/auth/verify-otp', {
 method: 'POST',
 body: JSON.stringify({ email, otp}),
});
},
 async resetPassword(email, otp, newPassword) {
 return await request('/auth/reset-password', {
 method: 'POST',
 body: JSON.stringify({ email, otp, newPassword}),
});
},
 async changePassword(currentPassword, newPassword) {
 return await request('/auth/change-password', {
 method: 'PUT',
 body: JSON.stringify({ currentPassword, newPassword}),
});
},
};
// ─── Career APIs ─────────────────────────────────────────────────────────────
export const careerAPI = {
 async getCareers() {
 const data = await request('/careers');
 return data.data;
},
 async selectCareer(userId, careerId) {
 // Update careerGoal on the backend
 await request('/auth/profile', {
 method: 'PUT',
 body: JSON.stringify({ careerGoal: careerId}),
});
 // Keep localStorage in sync
 const stored = localStorage.getItem('cn_user') || sessionStorage.getItem('cn_user');
 if (stored) {
 const user = JSON.parse(stored);
 user.career = careerId;
 const storage = localStorage.getItem('cn_token') ? localStorage : sessionStorage;
 storage.setItem('cn_user', JSON.stringify(user));
}
 return { success: true};
},
};
// ─── Domain APIs ──────────────────────────────────────────────────────────────
export const domainAPI = {
 async getDomains() {
 const data = await request('/domains');
 return data.data; // string[]
},
 async getCareerPaths(domain) {
 const data = await request(`/domains/${encodeURIComponent(domain)}/career-paths`);
 return data.data; // string[]
},
};
// ─── Roadmap APIs ─────────────────────────────────────────────────────────────
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
 async generateRoadmap({ domain, careerPath, level}) {
 const data = await request('/roadmap/generate', {
 method: 'POST',
 body: JSON.stringify({ domain, careerPath, level}),
});
 // Persist career slug to the active storage so the roadmap page loads correctly
 const stored = localStorage.getItem('cn_user') || sessionStorage.getItem('cn_user');
 if (stored) {
 const user = JSON.parse(stored);
 user.career = data.data.career;
 const storage = localStorage.getItem('cn_token') ? localStorage : sessionStorage;
 storage.setItem('cn_user', JSON.stringify(user));
}
 return data;
},
 async createCustomRoadmap(roadmapData) {
 const data = await request('/roadmap/custom', {
 method: 'POST',
 body: JSON.stringify(roadmapData),
});
 // Update user career in active storage
 const stored = localStorage.getItem('cn_user') || sessionStorage.getItem('cn_user');
 if (stored) {
 const user = JSON.parse(stored);
 user.career = data.data.career;
 const storage = localStorage.getItem('cn_token') ? localStorage : sessionStorage;
 storage.setItem('cn_user', JSON.stringify(user));
}
 return data;
}
};
// ─── Skills APIs ──────────────────────────────────────────────────────────────
export const skillsAPI = {
 async getAllSkills() {
 const data = await request('/skills');
 return data.data;
},
 // Derive assessment skills directly from the roadmap for the selected career.
 // This guarantees only career-specific skills are shown — not the global skills list.
 async getAssessmentSkills(careerId) {
 const data = await request(`/roadmap/${careerId}`);
 const roadmap = data.data;
 // Group skills by stage title (mirrors the roadmap structure)
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
 console.log("Calling API:", `/api/v1/skills/${skillId}`);
 const data = await request(`/skills/${skillId}`);
 return data.data;
} catch (err) {
 if (err.status === 404) return null;
 throw err;
}
},
 // roadmapId scopes the bulk-completed skills to the user's current career
 async saveKnownSkills(userId, skillIds, roadmapId = '') {
 const progressMap = {};
 skillIds.forEach(id => { progressMap[id] = 'completed';});
 await request('/progress/bulk', {
 method: 'POST',
 body: JSON.stringify({ progress: progressMap, roadmapId}),
});
 // Keep active storage in sync
 const stored = localStorage.getItem('cn_user') || sessionStorage.getItem('cn_user');
 if (stored) {
 const user = JSON.parse(stored);
 user.knownSkills = skillIds;
 const storage = localStorage.getItem('cn_token') ? localStorage : sessionStorage;
 storage.setItem('cn_user', JSON.stringify(user));
}
 return { success: true};
},
};
// ─── Progress APIs ────────────────────────────────────────────────────────────
export const progressAPI = {
 // roadmapId scopes the returned progress to the user's current career
 async getProgress(userId, roadmapId = '') {
 const qs = roadmapId ? `?roadmapId=${encodeURIComponent(roadmapId)}` : '';
 const data = await request(`/progress${qs}`);
 return data.data; // { skillId: status}
},
 // roadmapId scopes this single-skill update to the correct career
 async updateProgress(userId, skillId, status, roadmapId = '') {
 const data = await request('/progress', {
 method: 'POST',
 body: JSON.stringify({ skillId, status, roadmapId}),
});
 return { success: true, progress: data.data};
},
 async bulkUpdateProgress(userId, progressMap, roadmapId = '') {
 await request('/progress/bulk', {
 method: 'POST',
 body: JSON.stringify({ progress: progressMap, roadmapId}),
});
 return { success: true};
},
 async resetProgress(roadmapId = '') {
 const qs = roadmapId ? `?roadmapId=${encodeURIComponent(roadmapId)}` : '';
 return await request(`/progress${qs}`, { method: 'DELETE'});
},
};
// ─── Resources APIs ───────────────────────────────────────────────────────────
export const resourcesAPI = {
 async getResources(career) {
 try {
 const data = await request(`/resources/${encodeURIComponent(career)}`);
 // Always return an array — never throw for missing resources
 return Array.isArray(data.data) ? data.data : [];
} catch (err) {
 // Backend no longer returns 404 for missing resources, but guard anyway
 if (err.status === 404) return [];
 throw err;
}
},
};
