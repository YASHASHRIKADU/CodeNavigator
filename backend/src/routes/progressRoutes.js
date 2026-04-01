const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/auth');
const { progressRules, handleValidationErrors } = require('../middleware/validate');
const {
    updateProgress,
    bulkUpdateProgress,
    getMyProgress,
    getUserProgress,
    resetProgress,
} = require('../controllers/progressController');

// All progress routes require authentication
router.use(protect);

// GET  /api/v1/progress          — current user's progress map
router.get('/', getMyProgress);

// POST /api/v1/progress          — upsert a single skill status
router.post('/', progressRules, handleValidationErrors, updateProgress);

// POST /api/v1/progress/bulk     — bulk upsert
router.post('/bulk', bulkUpdateProgress);

// DELETE /api/v1/progress     — reset all progress (or scoped by ?roadmapId=)
router.delete('/', resetProgress);

// GET  /api/v1/progress/:userId  — get specific user's progress
router.get('/:userId', getUserProgress);

module.exports = router;
