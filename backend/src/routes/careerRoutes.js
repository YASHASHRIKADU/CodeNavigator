const express = require('express');
const router  = express.Router();
const { getCareers, getCareerById } = require('../controllers/careerController');

// GET /api/v1/careers
router.get('/', getCareers);

// GET /api/v1/careers/:id
router.get('/:id', getCareerById);

module.exports = router;
