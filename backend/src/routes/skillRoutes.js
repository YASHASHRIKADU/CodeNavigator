const express = require('express');
const router  = express.Router();
const { getSkills, getSkillById } = require('../controllers/skillController');

// GET /api/v1/skills
router.get('/', getSkills);

// GET /api/v1/skills/:skillId
router.get('/:skillId', getSkillById);

module.exports = router;
