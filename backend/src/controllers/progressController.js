const Progress = require('../models/Progress');

// POST /api/v1/progress  [protected]
// Body: { skillId, status, roadmapId? }
const updateProgress = async (req, res, next) => {
    try {
        const { skillId, status, roadmapId = '' } = req.body;
        const userId = req.user._id;

        // Upsert scoped by userId + roadmapId + skillId
        const progress = await Progress.findOneAndUpdate(
            { userId, roadmapId, skillId },
            { userId, roadmapId, skillId, status },
            { upsert: true, new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: progress });
    } catch (error) {
        next(error);
    }
};

// POST /api/v1/progress/bulk  [protected]
// Body: { progress: { [skillId]: status }, roadmapId? }
const bulkUpdateProgress = async (req, res, next) => {
    try {
        const { progress, roadmapId = '' } = req.body;
        if (!progress || typeof progress !== 'object') {
            return res.status(400).json({ success: false, message: 'progress object is required' });
        }

        const userId = req.user._id;
        const ops    = Object.entries(progress).map(([skillId, status]) => ({
            updateOne: {
                filter: { userId, roadmapId, skillId },
                update: { userId, roadmapId, skillId, status },
                upsert: true,
            },
        }));

        await Progress.bulkWrite(ops);
        res.status(200).json({ success: true, message: `Updated ${ops.length} skills` });
    } catch (error) {
        next(error);
    }
};

// GET /api/v1/progress  [protected]
// Query: ?roadmapId=frontend  — filter by career (optional)
const getMyProgress = async (req, res, next) => {
    try {
        const filter = { userId: req.user._id };

        // If a roadmapId is provided, scope results to that career
        if (req.query.roadmapId) {
            filter.roadmapId = req.query.roadmapId.toLowerCase();
        }

        const records = await Progress.find(filter);

        // Return as a flat map keyed by skillId  { skillId: status }
        const progressMap = {};
        records.forEach(r => { progressMap[r.skillId] = r.status; });

        res.status(200).json({ success: true, count: records.length, data: progressMap });
    } catch (error) {
        next(error);
    }
};

// GET /api/v1/progress/:userId  [protected]
const getUserProgress = async (req, res, next) => {
    try {
        if (req.user._id.toString() !== req.params.userId) {
            return res.status(403).json({ success: false, message: 'Forbidden — cannot access another user\'s progress' });
        }

        const filter = { userId: req.params.userId };
        if (req.query.roadmapId) {
            filter.roadmapId = req.query.roadmapId.toLowerCase();
        }

        const records = await Progress.find(filter);
        const progressMap = {};
        records.forEach(r => { progressMap[r.skillId] = r.status; });

        res.status(200).json({ success: true, count: records.length, data: progressMap });
    } catch (error) {
        next(error);
    }
};

// DELETE /api/v1/progress  [protected]
// Deletes all progress for the logged-in user (optionally scoped to ?roadmapId=)
const resetProgress = async (req, res, next) => {
    try {
        const filter = { userId: req.user._id };
        if (req.query.roadmapId) {
            filter.roadmapId = req.query.roadmapId.toLowerCase();
        }
        const result = await Progress.deleteMany(filter);
        res.status(200).json({ success: true, message: `Deleted ${result.deletedCount} progress records.` });
    } catch (error) {
        next(error);
    }
};

module.exports = { updateProgress, bulkUpdateProgress, getMyProgress, getUserProgress, resetProgress };
