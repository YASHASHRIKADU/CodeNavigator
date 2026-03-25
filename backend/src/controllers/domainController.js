/**
 * Domain Controller
 *
 * Serves the predefined domain → career path mapping.
 * Adding new domains or paths here automatically exposes them to the frontend
 * via the /api/v1/domains endpoints — no frontend code changes required.
 */

const DOMAIN_CAREER_PATHS = {
    'Web Development': [
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
    ],
    'AI': [
        'Machine Learning Engineer',
        'AI Engineer',
        'Prompt Engineer',
    ],
    'Cloud': [
        'Cloud Engineer',
        'Cloud Architect',
        'Site Reliability Engineer',
    ],
    'Cybersecurity': [
        'Security Analyst',
        'Penetration Tester',
        'Security Engineer',
    ],
    'Data Science': [
        'Data Analyst',
        'Data Scientist',
        'Machine Learning Engineer',
    ],
    'Mobile App Development': [
        'Android Developer',
        'iOS Developer',
        'Cross Platform Developer',
    ],
    'Game Development': [
        'Game Programmer',
        'Unity Developer',
        'Unreal Engine Developer',
    ],
    'DevOps': [
        'DevOps Engineer',
        'Platform Engineer',
        'Automation Engineer',
    ],
};

// GET /api/v1/domains
const getDomains = (req, res) => {
    const domains = Object.keys(DOMAIN_CAREER_PATHS);
    res.status(200).json({ success: true, count: domains.length, data: domains });
};

// GET /api/v1/domains/:domain/career-paths
const getCareerPathsByDomain = (req, res) => {
    // The domain name may contain spaces so it arrives URL-encoded; decode it.
    const domain = decodeURIComponent(req.params.domain);
    const paths = DOMAIN_CAREER_PATHS[domain];

    if (!paths) {
        return res.status(404).json({
            success: false,
            message: `No career paths found for domain: "${domain}". Available domains: ${Object.keys(DOMAIN_CAREER_PATHS).join(', ')}`,
        });
    }

    res.status(200).json({ success: true, domain, count: paths.length, data: paths });
};

module.exports = { getDomains, getCareerPathsByDomain, DOMAIN_CAREER_PATHS };
