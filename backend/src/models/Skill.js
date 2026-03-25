const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        type: {
            type: String,
            enum: ['docs', 'video', 'tutorial', 'practice', 'article', 'course', 'book'],
            required: true,
        },
        url: { type: String, required: true, trim: true },
        free: { type: Boolean, default: true },
    },
    { _id: false }
);

const skillSchema = new mongoose.Schema(
    {
        skillId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        skillName: {
            type: String,
            required: [true, 'Skill name is required'],
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
        },
        difficulty: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            default: 'Beginner',
        },
        duration: { type: String, default: '1 week' },
        resources: [resourceSchema],
    },
    { timestamps: true }
);

// Text index for search
skillSchema.index({ skillName: 'text', category: 'text', description: 'text' });

module.exports = mongoose.model('Skill', skillSchema);
