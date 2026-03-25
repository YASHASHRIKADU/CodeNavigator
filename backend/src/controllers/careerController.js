// Career data is served from a static definition to avoid unnecessary DB reads.
// For a larger app, this can be moved to a MongoDB collection.

const CAREERS = [
    {
        id: 'frontend',
        title: 'Frontend Developer',
        icon: '🖥️',
        description: 'Build stunning user interfaces with HTML, CSS, JavaScript, and modern frameworks like React.',
        skills: 30,
        duration: '6–8 months',
        difficulty: 'Beginner Friendly',
        tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    },
    {
        id: 'backend',
        title: 'Backend Developer',
        icon: '⚙️',
        description: 'Design and build scalable server-side systems, APIs, and databases using Node.js or Python.',
        skills: 28,
        duration: '7–9 months',
        difficulty: 'Intermediate',
        tags: ['Node.js', 'Express', 'MongoDB', 'REST'],
    },
    {
        id: 'fullstack',
        title: 'Full Stack Developer',
        icon: '🚀',
        description: 'Master both frontend and backend to build complete web applications end-to-end.',
        skills: 50,
        duration: '10–12 months',
        difficulty: 'Intermediate–Advanced',
        tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
    },
    {
        id: 'datascience',
        title: 'Data Scientist',
        icon: '📊',
        description: 'Analyze data, build ML models, and extract insights using Python, statistics, and AI tools.',
        skills: 35,
        duration: '8–10 months',
        difficulty: 'Intermediate–Advanced',
        tags: ['Python', 'Pandas', 'ML', 'TensorFlow'],
    },
    {
        id: 'ai-engineer',
        title: 'AI Engineer (2026)',
        icon: '🤖',
        description: 'Design and deploy intelligent systems using ML, DL, LLMs, and modern AI APIs.',
        skills: 28,
        duration: '8–10 months',
        difficulty: 'Advanced',
        tags: ['Python', 'LLMs', 'Prompt Engineering', 'AI APIs'],
    },
    {
        id: 'data-engineer',
        title: 'Data Engineer',
        icon: '🗄️',
        description: 'Build scalable data pipelines, data warehouses, and manage large-scale data systems.',
        skills: 28,
        duration: '7–9 months',
        difficulty: 'Intermediate',
        tags: ['SQL', 'Python', 'ETL', 'Spark'],
    },
    {
        id: 'cybersecurity',
        title: 'Cybersecurity Engineer',
        icon: '🔒',
        description: 'Protect systems and networks through ethical hacking, pentesting, and security analysis.',
        skills: 28,
        duration: '9–12 months',
        difficulty: 'Advanced',
        tags: ['Networking', 'Ethical Hacking', 'Security'],
    },
    {
        id: 'cloud-engineer',
        title: 'Cloud Engineer',
        icon: '☁️',
        description: 'Design, deploy, and manage distributed cloud architectures on AWS, Azure, or GCP.',
        skills: 28,
        duration: '6–8 months',
        difficulty: 'Intermediate',
        tags: ['Linux', 'Networking', 'AWS/Azure', 'Kubernetes'],
    },
    {
        id: 'devops',
        title: 'DevOps Engineer',
        icon: '🏗️',
        description: 'Streamline software delivery with CI/CD, containerization, and infrastructure automation.',
        skills: 28,
        duration: '8–12 months',
        difficulty: 'Intermediate-Advanced',
        tags: ['Git', 'Docker', 'Kubernetes', 'CI/CD'],
    },
    {
        id: 'ai-product',
        title: 'AI Product Engineer',
        icon: '🧠',
        description: 'Build end-to-end AI-powered applications integrating LLMs, vector databases, and RAG.',
        skills: 28,
        duration: '6–9 months',
        difficulty: 'Intermediate',
        tags: ['LLMs', 'RAG', 'Vector DBs', 'Prompt Engineering'],
    },
];

// GET /api/v1/careers
const getCareers = (req, res) => {
    res.status(200).json({ success: true, count: CAREERS.length, data: CAREERS });
};

// GET /api/v1/careers/:id
const getCareerById = (req, res) => {
    const career = CAREERS.find(c => c.id === req.params.id.toLowerCase());
    if (!career) {
        return res.status(404).json({ success: false, message: `Career '${req.params.id}' not found` });
    }
    res.status(200).json({ success: true, data: career });
};

module.exports = { getCareers, getCareerById };
