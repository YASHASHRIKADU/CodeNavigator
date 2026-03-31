const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, 'src', 'utils', 'seed.js');
const sourceCode = fs.readFileSync(seedPath, 'utf8');

// Use a simple regex to extract the SKILLS array.
const match = sourceCode.match(/const SKILLS = (\[[\s\S]*?\]);\s*\n\/\/ ─── Roadmaps Data/);
if (match) {
    // Evaluate the array
    const SKILLS = eval(match[1]);
    
    // Map to the user's requested format
    const skillsData = SKILLS.map(s => ({
        id: s.skillId,
        title: s.skillName,
        category: s.category,
        description: s.description,
        difficulty: s.difficulty,
        duration: s.duration,
        resources: s.resources
    }));

    const outputPath = path.join(__dirname, 'src', 'data', 'skillsData.js');
    if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    fs.writeFileSync(outputPath, `export const skillsData = ${JSON.stringify(skillsData, null, 4)};\n`, 'utf8');
    console.log('Successfully created skillsData.js');
} else {
    console.error('Failed to parse SKILLS from seed.js');
}
