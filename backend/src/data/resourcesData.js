const resourcesData = [
    {
        career: "frontend",
        category: "HTML & CSS",
        items: [
            { title: 'MDN Web Docs — HTML', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', free: true },
            { title: 'CSS-Tricks', type: 'tutorial', url: 'https://css-tricks.com', free: true },
            { title: 'Flexbox Froggy', type: 'practice', url: 'https://flexboxfroggy.com', free: true }
        ]
    },
    {
        career: "frontend",
        category: "JavaScript",
        items: [
            { title: 'JavaScript.info', type: 'docs', url: 'https://javascript.info', free: true },
            { title: 'freeCodeCamp JS Course', type: 'video', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', free: true },
            { title: 'Eloquent JavaScript', type: 'docs', url: 'https://eloquentjavascript.net', free: true }
        ]
    },
    {
        career: "frontend",
        category: "React",
        items: [
            { title: 'React Official Documentation', type: 'docs', url: 'https://react.dev', free: true },
            { title: 'Scrimba React Course', type: 'tutorial', url: 'https://scrimba.com/learn/learnreact', free: false },
            { title: 'React Tutorial — Traversy Media', type: 'video', url: 'https://www.youtube.com/watch?v=LDB4uaJ87e0', free: true }
        ]
    },
    {
        career: "backend",
        category: "Node.js & API Fundamentals",
        items: [
            { title: 'Node.js Official Docs', type: 'docs', url: 'https://nodejs.org/docs/latest/api/', free: true },
            { title: 'Express.js Getting Started', type: 'docs', url: 'https://expressjs.com/en/starter/installing.html', free: true },
            { title: 'The Odin Project — NodeJS', type: 'tutorial', url: 'https://www.theodinproject.com/paths/full-stack-javascript', free: true }
        ]
    },
    {
        career: "backend",
        category: "Databases & Architecture",
        items: [
            { title: 'MongoDB University', type: 'video', url: 'https://learn.mongodb.com', free: true },
            { title: 'PostgreSQL Tutorial', type: 'tutorial', url: 'https://www.postgresqltutorial.com', free: true }
        ]
    },
    {
        career: "fullstack",
        category: "Full Stack Mastery",
        items: [
            { title: 'Full Stack Open', type: 'tutorial', url: 'https://fullstackopen.com/en/', free: true },
            { title: 'The Odin Project', type: 'practice', url: 'https://www.theodinproject.com/', free: true },
            { title: 'MDN Web Docs', type: 'docs', url: 'https://developer.mozilla.org/en-US/', free: true }
        ]
    },
    {
        career: "data-science",
        category: "Python & Data Science",
        items: [
            { title: 'Python.org Documentation', type: 'docs', url: 'https://docs.python.org/3/', free: true },
            { title: 'Kaggle — Free Courses', type: 'tutorial', url: 'https://www.kaggle.com/learn', free: true },
            { title: 'fast.ai — Practical Deep Learning', type: 'video', url: 'https://course.fast.ai', free: true }
        ]
    },
    {
        career: "ai",
        category: "Artificial Intelligence & ML",
        items: [
            { title: 'Machine Learning by Andrew Ng', type: 'video', url: 'https://www.coursera.org/learn/machine-learning', free: true },
            { title: 'Hugging Face NLP Course', type: 'tutorial', url: 'https://huggingface.co/learn/nlp-course', free: true },
            { title: 'DeepLearning.AI', type: 'docs', url: 'https://www.deeplearning.ai/', free: true }
        ]
    },
    {
        career: "cloud",
        category: "Cloud Computing & Architecture",
        items: [
            { title: 'AWS Skill Builder', type: 'tutorial', url: 'https://explore.skillbuilder.aws/', free: true },
            { title: 'Google Cloud Training', type: 'video', url: 'https://cloud.google.com/training', free: true },
            { title: 'Microsoft Learn for Azure', type: 'docs', url: 'https://learn.microsoft.com/en-us/training/azure/', free: true }
        ]
    },
    {
        career: "cybersecurity",
        category: "Cybersecurity Fundamentals",
        items: [
            { title: 'TryHackMe — Beginner', type: 'practice', url: 'https://tryhackme.com', free: true },
            { title: 'HackTheBox Academy', type: 'tutorial', url: 'https://academy.hackthebox.com', free: false },
            { title: 'OWASP Top 10', type: 'docs', url: 'https://owasp.org/www-project-top-ten/', free: true }
        ]
    },
    {
        career: "devops",
        category: "DevOps & CI/CD",
        items: [
            { title: 'DevOps Roadmap', type: 'docs', url: 'https://roadmap.sh/devops', free: true },
            { title: 'Docker Documentation', type: 'docs', url: 'https://docs.docker.com/', free: true },
            { title: 'Kubernetes Basics', type: 'tutorial', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', free: true }
        ]
    },
    {
        career: "mobile-development",
        category: "Mobile App Essentials",
        items: [
            { title: 'React Native Documentation', type: 'docs', url: 'https://reactnative.dev/docs/getting-started', free: true },
            { title: 'Android Developer Basics', type: 'tutorial', url: 'https://developer.android.com/courses', free: true },
            { title: 'iOS App Dev Tutorials', type: 'practice', url: 'https://developer.apple.com/tutorials/app-dev-training', free: true }
        ]
    },
    {
        career: "game-development",
        category: "Game Design & Engines",
        items: [
            { title: 'Unity Learn', type: 'tutorial', url: 'https://learn.unity.com/', free: true },
            { title: 'Unreal Engine Documentation', type: 'docs', url: 'https://docs.unrealengine.com/', free: true },
            { title: 'Godot Engine Docs', type: 'docs', url: 'https://docs.godotengine.org/', free: true }
        ]
    }
];

module.exports = resourcesData;
