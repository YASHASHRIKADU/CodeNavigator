const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
        },
        // Career slug (e.g. 'frontend', 'backend') — scopes progress per roadmap
        roadmapId: {
            type: String,
            trim: true,
            lowercase: true,
            default: '',
        },
        skillId: {
            type: String,
            required: [true, 'Skill ID is required'],
            trim: true,
        },
        status: {
            type: String,
            enum: {
                values: ['not-started', 'in-progress', 'completed'],
                message: 'Status must be not-started, in-progress, or completed',
            },
            default: 'not-started',
        },
    },
    {
        timestamps: true,
    }
);

// Compound index: one record per user per roadmap per skill
progressSchema.index({ userId: 1, roadmapId: 1, skillId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
