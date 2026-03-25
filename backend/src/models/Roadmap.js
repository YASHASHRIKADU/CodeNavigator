const mongoose = require('mongoose');

const stageSkillRef = new mongoose.Schema(
    {
        skillId:    { type: String, required: true },
        name:       { type: String, required: true },
        difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    },
    { _id: false }
);

const stageSchema = new mongoose.Schema(
    {
        stage:       { type: Number, required: true },
        title:       { type: String, required: true, trim: true },
        description: { type: String, trim: true, default: '' },
        skills:      [stageSkillRef],
    },
    { _id: false }
);

const roadmapSchema = new mongoose.Schema(
    {
        career: {
            type: String,
            required: [true, 'Career identifier is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        totalSkills: {
            type: Number,
            default: 0,
        },
        stages: [stageSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Roadmap', roadmapSchema);
