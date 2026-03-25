const Skill = require('../models/Skill');

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

        res.status(200).json({ success: true, count: skills.length, data: skills });
    } catch (error) {
        next(error);
    }
};

// GET /api/v1/skills/:skillId
const getSkillById = async (req, res, next) => {
    try {
        const skill = await Skill.findOne({ skillId: req.params.skillId.toLowerCase() });

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: `Skill '${req.params.skillId}' not found`,
            });
        }

        res.status(200).json({ success: true, data: skill });
    } catch (error) {
        next(error);
    }
};

module.exports = { getSkills, getSkillById };
