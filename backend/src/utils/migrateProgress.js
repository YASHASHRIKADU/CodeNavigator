/**
 * Migration: Drop old Progress unique index and re-create with roadmapId.
 * Run once with: node src/utils/migrateProgress.js
 */
require('dotenv').config();
const mongoose = require('mongoose');

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ Connected to MongoDB');

        const db = mongoose.connection.db;
        const collection = db.collection('progresses');

        // Drop the old compound index (userId + skillId) if it exists
        try {
            await collection.dropIndex('userId_1_skillId_1');
            console.log('🗑️  Dropped old index: userId_1_skillId_1');
        } catch (e) {
            console.log('ℹ️  Old index not found (already dropped or different name) — continuing');
        }

        // Clear all existing progress records (they were stored without roadmapId)
        const result = await collection.deleteMany({});
        console.log(`🗑️  Cleared ${result.deletedCount} old progress records`);

        // Mongoose will auto-create the new index (userId+roadmapId+skillId)
        // on first use. Explicitly create it now:
        await collection.createIndex(
            { userId: 1, roadmapId: 1, skillId: 1 },
            { unique: true, name: 'userId_1_roadmapId_1_skillId_1' }
        );
        console.log('✅ Created new index: userId_1_roadmapId_1_skillId_1');

        await mongoose.disconnect();
        console.log('✅ Migration complete — reconnect your backend server');
    } catch (err) {
        console.error('❌ Migration failed:', err);
        process.exit(1);
    }
}

migrate();
