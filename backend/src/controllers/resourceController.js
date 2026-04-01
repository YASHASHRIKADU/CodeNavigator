const resourcesData = require('../data/resourcesData');

/**
 * Map long career slugs (produced by roadmap generation, e.g.
 * "web-development-frontend-developer-beginner") to the canonical
 * short career IDs stored in resourcesData.
 */
const SLUG_KEYWORD_MAP = [
    { keywords: ['frontend'],       career: 'frontend' },
    { keywords: ['backend'],        career: 'backend' },
    { keywords: ['full-stack', 'fullstack'], career: 'fullstack' },
    { keywords: ['data-scientist', 'datascience', 'data-science'], career: 'datascience' },
    { keywords: ['ai-engineer', 'ai-product', 'machine-learning', 'ml-engineer'], career: 'ai-engineer' },
    { keywords: ['ai-product'],     career: 'ai-product' },
    { keywords: ['data-engineer'],  career: 'data-engineer' },
    { keywords: ['devops'],         career: 'devops' },
    { keywords: ['cloud-engineer', 'cloud-architect', 'cloud'], career: 'cloud-engineer' },
    { keywords: ['cybersecurity', 'security-analyst', 'penetration-tester', 'security-engineer'], career: 'cybersecurity' },
    { keywords: ['mobile', 'android', 'ios', 'flutter'], career: 'mobile-development' },
    { keywords: ['game', 'unity', 'unreal'], career: 'game-development' },
];

/**
 * Resolve a raw career string (could be a short ID or a long slug) to
 * the canonical career key used in resourcesData.
 */
const resolveCareer = (raw) => {
    const normalized = raw.toLowerCase().trim();

    // 1. Direct match first
    const directMatch = resourcesData.find(r => r.career === normalized);
    if (directMatch) return normalized;

    // 2. Keyword-based match for long slugs
    for (const entry of SLUG_KEYWORD_MAP) {
        for (const kw of entry.keywords) {
            if (normalized.includes(kw)) {
                return entry.career;
            }
        }
    }

    // 3. No match — return the original so we return an empty array gracefully
    return normalized;
};

// GET /api/v1/resources/:career
exports.getResourcesByCareer = async (req, res) => {
    try {
        const { career } = req.params;
        const resolvedCareer = resolveCareer(career);

        console.log(`[Resources] requested: "${career}" → resolved: "${resolvedCareer}"`);

        const filteredResources = resourcesData.filter(r => r.career === resolvedCareer);

        // Always return 200 — an empty array is a valid "no resources yet" state,
        // not a 404. The frontend handles the empty state with a safe message.
        res.status(200).json({
            success: true,
            data: filteredResources
        });
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
