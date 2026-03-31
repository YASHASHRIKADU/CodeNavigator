const Skill = require('../models/Skill');
const { CAREER_SKILL_MAP, toSlug, getFallbackResources } = require('./roadmapController');
const { skillsData } = require('../data/skillsData');

// Helper: search CAREER_SKILL_MAP for a skill by slug and create it in the DB
const createSkillFromMap = async (skillId) => {
    for (const [careerPath, stages] of Object.entries(CAREER_SKILL_MAP)) {
        for (let idx = 0; idx < stages.length; idx++) {
            const stageObj = stages[idx];
            for (const skillItem of stageObj.skills) {
                if (toSlug(skillItem.name) === skillId) {
                    const resources = skillItem.resources && skillItem.resources.length > 0
                        ? skillItem.resources
                        : getFallbackResources(skillItem.name);

                    const skill = await Skill.create({
                        skillId,
                        skillName: skillItem.name,
                        category: stageObj.stage,
                        description: `Learn ${skillItem.name} — a critical component of the ${careerPath} lifecycle.`,
                        difficulty: idx === 0 ? 'Beginner' : idx === 1 ? 'Intermediate' : 'Advanced',
                        duration: '1-2 weeks',
                        resources,
                    });
                    return skill;
                }
            }
        }
    }
    return null;
};

// Helper: normalize skill document to include `name` field for frontend
const normalizeSkill = (skill) => {
    const obj = skill.toObject();
    obj.name = obj.skillName;
    return obj;
};

// GET /api/v1/skills
const getSkills = async (req, res, next) => {
    try {
        const filter = {};

        // Optional ?category= filter
        if (req.query.category) {
            filter.category = { $regex: req.query.category, $options: 'i' };
        }

        // Optional ?search= text filter
        if (req.query.search) {
            filter.$text = { $search: req.query.search };
        }

        const skills = await Skill.find(filter).sort({ category: 1, skillName: 1 });

        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills.map(normalizeSkill),
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/v1/skills/:skillId
const getSkillById = async (req, res, next) => {
    try {
        console.log("Incoming skillId:", req.params.skillId);
        const sid = req.params.skillId.toLowerCase();
        let skill = await Skill.findOne({ skillId: sid });

        // Fallback 1: Create from centralized static skillsData if missing from DB
        if (!skill) {
            const staticSkill = skillsData.find(s => s.id === sid);
            if (staticSkill) {
                skill = await Skill.create({
                    skillId: staticSkill.id,
                    skillName: staticSkill.title,
                    category: staticSkill.category || 'General Tech',
                    description: staticSkill.description || `Learn ${staticSkill.title}`,
                    difficulty: staticSkill.difficulty || 'Beginner',
                    duration: staticSkill.duration || '1-2 weeks',
                    resources: staticSkill.resources || []
                });
            }
        }

        // Fallback 2: create from CAREER_SKILL_MAP if not in DB yet
        if (!skill) {
            skill = await createSkillFromMap(sid);
        }

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: `Skill '${req.params.skillId}' not found`,
            });
        }

        res.status(200).json({ success: true, data: normalizeSkill(skill) });
    } catch (error) {
        next(error);
    }
};

module.exports = { getSkills, getSkillById };
