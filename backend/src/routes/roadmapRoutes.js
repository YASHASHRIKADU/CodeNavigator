const express = require('express');
const router  = express.Router();
const { getRoadmap, getAllRoadmaps, createCustomRoadmap, generateRoadmap } = require('../controllers/roadmapController');
const { protect } = require('../middleware/auth');

// GET /api/v1/roadmap
router.get('/', getAllRoadmaps);

// POST /api/v1/roadmap/generate
router.post('/generate', protect, generateRoadmap);

// POST /api/v1/roadmap/custom
router.post('/custom', protect, createCustomRoadmap);

// GET /api/v1/roadmap/:career   e.g. /api/v1/roadmap/frontend
router.get('/:career', getRoadmap);

module.exports = router;

