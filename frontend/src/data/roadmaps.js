// Mock roadmaps for each career path
export const roadmaps = {
 frontend: {
 careerId: 'frontend',
 title: 'Frontend Developer Roadmap',
 totalSkills: 16,
 stages: [
 {
 id: 'stage-1',
 stage: 1,
 title: 'Web Fundamentals',
 description: 'Master the building blocks of the web',
 color: 'bg-blue-500',
 skills: [
 { id: 'html-basics', name: 'HTML Basics', category: 'HTML', difficulty: 'Beginner'},
 { id: 'html-forms', name: 'HTML Forms & Semantics', category: 'HTML', difficulty: 'Beginner'},
 { id: 'css-basics', name: 'CSS Basics & Selectors', category: 'CSS', difficulty: 'Beginner'},
 { id: 'css-flexbox', name: 'Flexbox & Grid', category: 'CSS', difficulty: 'Beginner'},
 ],
},
 {
 id: 'stage-2',
 stage: 2,
 title: 'JavaScript Core',
 description: 'Learn JavaScript to bring your pages to life',
 color: 'bg-yellow-500',
 skills: [
 { id: 'js-fundamentals', name: 'JS Fundamentals', category: 'JavaScript', difficulty: 'Beginner'},
 { id: 'js-dom', name: 'DOM Manipulation', category: 'JavaScript', difficulty: 'Beginner'},
 { id: 'js-async', name: 'Async JS & Promises', category: 'JavaScript', difficulty: 'Intermediate'},
 { id: 'js-es6', name: 'ES6+ Features', category: 'JavaScript', difficulty: 'Intermediate'},
 ],
},
 {
 id: 'stage-3',
 stage: 3,
 title: 'React Framework',
 description: 'Build dynamic UIs with React',
 color: 'bg-primary-500',
 skills: [
 { id: 'react-basics', name: 'React Basics & JSX', category: 'React', difficulty: 'Intermediate'},
 { id: 'react-hooks', name: 'Hooks & State Management', category: 'React', difficulty: 'Intermediate'},
 { id: 'react-router', name: 'React Router', category: 'React', difficulty: 'Intermediate'},
 { id: 'react-api', name: 'API Integration', category: 'React', difficulty: 'Intermediate'},
 ],
},
 {
 id: 'stage-4',
 stage: 4,
 title: 'Projects & Deployment',
 description: 'Build real projects and ship them',
 color: 'bg-accent',
 skills: [
 { id: 'tailwind', name: 'Tailwind CSS', category: 'Styling', difficulty: 'Beginner'},
 { id: 'git', name: 'Git & GitHub', category: 'Tools', difficulty: 'Beginner'},
 { id: 'portfolio', name: 'Portfolio Project', category: 'Projects', difficulty: 'Intermediate'},
 { id: 'deploy', name: 'Deployment with Vercel', category: 'Tools', difficulty: 'Beginner'},
 ],
},
 ],
},
 backend: {
 careerId: 'backend',
 title: 'Backend Developer Roadmap',
 totalSkills: 16,
 stages: [
 {
 id: 'stage-1',
 stage: 1,
 title: 'Programming Fundamentals',
 description: 'Build a strong foundation with Node.js',
 color: 'bg-green-500',
 skills: [
 { id: 'node-basics', name: 'Node.js Basics', category: 'Node.js', difficulty: 'Beginner'},
 { id: 'npm', name: 'NPM & Package Management', category: 'Tools', difficulty: 'Beginner'},
 { id: 'js-advanced', name: 'Advanced JavaScript', category: 'JavaScript', difficulty: 'Intermediate'},
 { id: 'debugging', name: 'Debugging & Testing', category: 'Tools', difficulty: 'Beginner'},
 ],
},
 {
 id: 'stage-2',
 stage: 2,
 title: 'APIs & Express',
 description: 'Build REST APIs with Express.js',
 color: 'bg-emerald-500',
 skills: [
 { id: 'express', name: 'Express.js', category: 'Express', difficulty: 'Intermediate'},
 { id: 'rest-api', name: 'REST API Design', category: 'API', difficulty: 'Intermediate'},
 { id: 'middleware', name: 'Middleware & Error Handling', category: 'Express', difficulty: 'Intermediate'},
 { id: 'auth-jwt', name: 'Authentication & JWT', category: 'Security', difficulty: 'Intermediate'},
 ],
},
 {
 id: 'stage-3',
 stage: 3,
 title: 'Databases',
 description: 'Learn to work with MongoDB and SQL',
 color: 'bg-teal-500',
 skills: [
 { id: 'mongodb', name: 'MongoDB & Mongoose', category: 'Database', difficulty: 'Intermediate'},
 { id: 'sql', name: 'SQL Basics', category: 'Database', difficulty: 'Beginner'},
 { id: 'data-modeling', name: 'Data Modeling', category: 'Database', difficulty: 'Intermediate'},
 { id: 'caching', name: 'Caching with Redis', category: 'Database', difficulty: 'Advanced'},
 ],
},
 {
 id: 'stage-4',
 stage: 4,
 title: 'Deployment & DevOps',
 description: 'Deploy and scale your applications',
 color: 'bg-cyan-500',
 skills: [
 { id: 'docker', name: 'Docker Basics', category: 'DevOps', difficulty: 'Intermediate'},
 { id: 'ci-cd', name: 'CI/CD Pipelines', category: 'DevOps', difficulty: 'Advanced'},
 { id: 'render', name: 'Deploy on Render', category: 'Tools', difficulty: 'Beginner'},
 { id: 'monitoring', name: 'Logging & Monitoring', category: 'DevOps', difficulty: 'Intermediate'},
 ],
},
 ],
},
 fullstack: {
 careerId: 'fullstack',
 title: 'Full Stack Developer Roadmap',
 totalSkills: 20,
 stages: [
 {
 id: 'stage-1',
 stage: 1,
 title: 'Frontend Core',
 description: 'HTML, CSS, JavaScript fundamentals',
 color: 'bg-blue-500',
 skills: [
 { id: 'html-css', name: 'HTML & CSS', category: 'Frontend', difficulty: 'Beginner'},
 { id: 'js-fundamentals', name: 'JavaScript Fundamentals', category: 'Frontend', difficulty: 'Beginner'},
 { id: 'react-basics', name: 'React Basics', category: 'Frontend', difficulty: 'Intermediate'},
 { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', difficulty: 'Beginner'},
 { id: 'react-router', name: 'React Router', category: 'Frontend', difficulty: 'Intermediate'},
 ],
},
 {
 id: 'stage-2',
 stage: 2,
 title: 'Backend & APIs',
 description: 'Node.js, Express, and REST APIs',
 color: 'bg-green-500',
 skills: [
 { id: 'node-express', name: 'Node.js & Express', category: 'Backend', difficulty: 'Intermediate'},
 { id: 'rest-api', name: 'REST API Design', category: 'Backend', difficulty: 'Intermediate'},
 { id: 'auth', name: 'Authentication', category: 'Backend', difficulty: 'Intermediate'},
 { id: 'file-upload', name: 'File Upload & Storage', category: 'Backend', difficulty: 'Intermediate'},
 { id: 'websockets', name: 'WebSockets', category: 'Backend', difficulty: 'Advanced'},
 ],
},
 {
 id: 'stage-3',
 stage: 3,
 title: 'Databases & State',
 description: 'Data persistence and management',
 color: 'bg-primary-500',
 skills: [
 { id: 'mongodb', name: 'MongoDB', category: 'Database', difficulty: 'Intermediate'},
 { id: 'redux', name: 'Redux / Zustand', category: 'State', difficulty: 'Intermediate'},
 { id: 'sql', name: 'SQL Basics', category: 'Database', difficulty: 'Beginner'},
 { id: 'orm', name: 'ORM / Prisma', category: 'Database', difficulty: 'Intermediate'},
 { id: 'caching', name: 'Caching Strategies', category: 'Backend', difficulty: 'Advanced'},
 ],
},
 {
 id: 'stage-4',
 stage: 4,
 title: 'Deployment & Projects',
 description: 'Ship real full-stack applications',
 color: 'bg-accent',
 skills: [
 { id: 'full-project', name: 'Full Stack Project', category: 'Projects', difficulty: 'Advanced'},
 { id: 'deploy-full', name: 'Full Stack Deployment', category: 'Tools', difficulty: 'Intermediate'},
 { id: 'testing', name: 'Testing (Jest, Vitest)', category: 'Tools', difficulty: 'Intermediate'},
 { id: 'ci-cd', name: 'CI/CD', category: 'DevOps', difficulty: 'Advanced'},
 { id: 'aws', name: 'AWS / Cloud Basics', category: 'DevOps', difficulty: 'Advanced'},
 ],
},
 ],
},
 datascience: {
 careerId: 'datascience',
 title: 'Data Scientist Roadmap',
 totalSkills: 16,
 stages: [
 {
 id: 'stage-1',
 stage: 1,
 title: 'Python & Statistics',
 description: 'Core programming and mathematical foundations',
 color: 'bg-purple-500',
 skills: [
 { id: 'python-basics', name: 'Python Basics', category: 'Python', difficulty: 'Beginner'},
 { id: 'statistics', name: 'Statistics & Probability', category: 'Math', difficulty: 'Intermediate'},
 { id: 'linear-algebra', name: 'Linear Algebra', category: 'Math', difficulty: 'Intermediate'},
 { id: 'numpy', name: 'NumPy', category: 'Python', difficulty: 'Beginner'},
 ],
},
 {
 id: 'stage-2',
 stage: 2,
 title: 'Data Analysis',
 description: 'Explore and analyze datasets',
 color: 'bg-violet-500',
 skills: [
 { id: 'pandas', name: 'Pandas', category: 'Python', difficulty: 'Intermediate'},
 { id: 'visualization', name: 'Data Visualization', category: 'Python', difficulty: 'Intermediate'},
 { id: 'sql-ds', name: 'SQL for Data Science', category: 'Database', difficulty: 'Intermediate'},
 { id: 'eda', name: 'Exploratory Data Analysis', category: 'Analysis', difficulty: 'Intermediate'},
 ],
},
 {
 id: 'stage-3',
 stage: 3,
 title: 'Machine Learning',
 description: 'Build predictive models',
 color: 'bg-indigo-500',
 skills: [
 { id: 'sklearn', name: 'Scikit-Learn', category: 'ML', difficulty: 'Intermediate'},
 { id: 'supervised', name: 'Supervised Learning', category: 'ML', difficulty: 'Intermediate'},
 { id: 'unsupervised', name: 'Unsupervised Learning', category: 'ML', difficulty: 'Advanced'},
 { id: 'model-eval', name: 'Model Evaluation', category: 'ML', difficulty: 'Intermediate'},
 ],
},
 {
 id: 'stage-4',
 stage: 4,
 title: 'Deep Learning & Projects',
 description: 'Neural networks and real DS projects',
 color: 'bg-fuchsia-500',
 skills: [
 { id: 'tensorflow', name: 'TensorFlow / Keras', category: 'DL', difficulty: 'Advanced'},
 { id: 'nlp', name: 'NLP Basics', category: 'DL', difficulty: 'Advanced'},
 { id: 'ds-project', name: 'End-to-End DS Project', category: 'Projects', difficulty: 'Advanced'},
 { id: 'mlops', name: 'MLOps Basics', category: 'Tools', difficulty: 'Advanced'},
 ],
},
 ],
},
 'ai-engineer': {
 careerId: 'ai-engineer',
 title: 'AI Engineer Roadmap',
 totalSkills: 9,
 stages: [
 {
 id: 'stage-1',
 stage: 1,
 title: 'Python & Math',
 description: 'Core programming and math for ML',
 color: 'bg-pink-500',
 skills: [
 { id: 'python', name: 'Python Basics', category: 'Language', difficulty: 'Beginner'},
 { id: 'math', name: 'Linear Algebra', category: 'Math', difficulty: 'Intermediate'},
 { id: 'numpy', name: 'NumPy & Pandas', category: 'Data', difficulty: 'Beginner'},
 ]
},
 {
 id: 'stage-2',
 stage: 2,
 title: 'Machine Learning Basics',
 description: 'Classic ML algorithms and evaluation',
 color: 'bg-rose-500',
 skills: [
 { id: 'ml', name: 'Scikit-Learn', category: 'ML', difficulty: 'Intermediate'}
 ]
},
 {
 id: 'stage-3',
 stage: 3,
 title: 'Deep Learning & LLMs',
 description: 'Neural networks and large language models',
 color: 'bg-fuchsia-500',
 skills: [
 { id: 'dl', name: 'Deep Learning', category: 'DL', difficulty: 'Advanced'},
 { id: 'llm', name: 'LLMs', category: 'LLMs', difficulty: 'Advanced'},
 { id: 'prompting', name: 'Prompt Engineering', category: 'LLMs', difficulty: 'Intermediate'}
 ]
},
 {
 id: 'stage-4',
 stage: 4,
 title: 'Deployment & APIs',
 description: 'Deploy models and use AI APIs',
 color: 'bg-purple-500',
 skills: [
 { id: 'apis', name: 'AI APIs', category: 'APIs', difficulty: 'Intermediate'},
 { id: 'deploy-ai', name: 'Deployment', category: 'Tools', difficulty: 'Advanced'}
 ]
}
 ]
},
 'data-engineer': {
 careerId: 'data-engineer',
 title: 'Data Engineer Roadmap',
 totalSkills: 7,
 stages: [
 {
 id: 'stage-1',
 stage: 1,
 title: 'SQL & Python',
 description: 'Database and scripting fundamentals',
 color: 'bg-orange-500',
 skills: [
 { id: 'sql-adv', name: 'Advanced SQL', category: 'Database', difficulty: 'Intermediate'},
 { id: 'python-de', name: 'Python for DE', category: 'Language', difficulty: 'Beginner'}
 ]
},
 {
 id: 'stage-2',
 stage: 2,
 title: 'Data Warehousing',
 description: 'Designing data structures for analytics',
 color: 'bg-amber-500',
 skills: [
 { id: 'dwh', name: 'Data Warehousing', category: 'Architecture', difficulty: 'Advanced'},
 { id: 'etl', name: 'ETL Pipelines', category: 'Data', difficulty: 'Intermediate'}
 ]
},
 {
 id: 'stage-3',
 stage: 3,
 title: 'Big Data Processing',
 description: 'Scaling data pipelines',
 color: 'bg-yellow-500',
 skills: [
 { id: 'spark', name: 'Apache Spark', category: 'Big Data', difficulty: 'Advanced'},
 { id: 'airflow', name: 'Airflow', category: 'Tools', difficulty: 'Advanced'}
 ]
},
 {
 id: 'stage-4',
 stage: 4,
 title: 'Cloud Platforms',
 description: 'Cloud native DE tools',
 color: 'bg-orange-600',
 skills: [
 { id: 'cloud-data', name: 'Cloud Data Platforms', category: 'Cloud', difficulty: 'Advanced'}
 ]
}
 ]
},
 'cybersecurity': {
 careerId: 'cybersecurity',
 title: 'Cybersecurity Roadmap',
 totalSkills: 6,
 stages: [
 {
 id: 'stage-1',
 stage: 1,
 title: 'Networking Basics',
 description: 'How the internet works',
 color: 'bg-red-500',
 skills: [
 { id: 'networking', name: 'Networking Fundamentals', category: 'Networking', difficulty: 'Beginner'},
 { id: 'linux-sec', name: 'Linux Basics', category: 'OS', difficulty: 'Beginner'}
 ]
},
 {
 id: 'stage-2',
 stage: 2,
 title: 'Ethical Hacking',
 description: 'Offensive security techniques',
 color: 'bg-rose-500',
 skills: [
 { id: 'ethical-hacking', name: 'Ethical Hacking', category: 'Security', difficulty: 'Intermediate'}
 ]
},
 {
 id: 'stage-3',
 stage: 3,
 title: 'Penetration Testing',
 description: 'Identifying vulnerabilities',
 color: 'bg-red-600',
 skills: [
 { id: 'pentesting', name: 'Penetration Testing', category: 'Security', difficulty: 'Advanced'},
 { id: 'sec-tools', name: 'Security Tools', category: 'Tools', difficulty: 'Intermediate'}
 ]
},
 {
 id: 'stage-4',
 stage: 4,
 title: 'Cloud Security',
 description: 'Securing cloud infrastructure',
 color: 'bg-rose-600',
 skills: [
 { id: 'cloud-sec', name: 'Cloud Security', category: 'Cloud', difficulty: 'Advanced'}
 ]
}
 ]
},
 'cloud-engineer': {
 careerId: 'cloud-engineer',
 title: 'Cloud Engineer Roadmap',
 totalSkills: 7,
 stages: [
 {
 id: 'stage-1',
 stage: 1,
 title: 'OS & Networking',
 description: 'Linux and network protocols',
 color: 'bg-sky-500',
 skills: [
 { id: 'linux-cloud', name: 'Linux', category: 'OS', difficulty: 'Beginner'},
 { id: 'networking-cloud', name: 'Networking', category: 'Networking', difficulty: 'Intermediate'}
 ]
},
 {
 id: 'stage-2',
 stage: 2,
 title: 'Cloud Providers',
 description: 'AWS, Azure, and GCP basics',
 color: 'bg-blue-500',
 skills: [
 { id: 'aws', name: 'AWS/Azure/GCP', category: 'Cloud', difficulty: 'Intermediate'},
 { id: 'cloud-arch', name: 'Cloud Architecture', category: 'Architecture', difficulty: 'Advanced'}
 ]
},
 {
 id: 'stage-3',
 stage: 3,
 title: 'Containerization',
 description: 'Docker and Kubernetes',
 color: 'bg-cyan-500',
 skills: [
 { id: 'docker-cloud', name: 'Containerization', category: 'Containers', difficulty: 'Intermediate'},
 { id: 'k8s', name: 'Kubernetes', category: 'Orchestration', difficulty: 'Advanced'}
 ]
},
 {
 id: 'stage-4',
 stage: 4,
 title: 'CI/CD & IAC',
 description: 'Automation and pipelines',
 color: 'bg-indigo-500',
 skills: [
 { id: 'cicd-cloud', name: 'CI/CD Pipelines', category: 'DevOps', difficulty: 'Advanced'}
 ]
}
 ]
},
 'devops': {
 careerId: 'devops',
 title: 'DevOps Engineer Roadmap',
 totalSkills: 7,
 stages: [
 {
 id: 'stage-1',
 stage: 1,
 title: 'Version Control & Basics',
 description: 'Git and scripting',
 color: 'bg-indigo-500',
 skills: [
 { id: 'git-devops', name: 'Git', category: 'Tools', difficulty: 'Beginner'}
 ]
},
 {
 id: 'stage-2',
 stage: 2,
 title: 'Containers & CI/CD',
 description: 'Testing and containerization',
 color: 'bg-blue-500',
 skills: [
 { id: 'docker-devops', name: 'Docker', category: 'Containers', difficulty: 'Intermediate'},
 { id: 'cicd', name: 'CI/CD Pipelines', category: 'DevOps', difficulty: 'Advanced'}
 ]
},
 {
 id: 'stage-3',
 stage: 3,
 title: 'Orchestration',
 description: 'Managing containers at scale',
 color: 'bg-sky-500',
 skills: [
 { id: 'k8s-devops', name: 'Kubernetes', category: 'Orchestration', difficulty: 'Advanced'},
 { id: 'iac', name: 'Infrastructure Automation', category: 'IAC', difficulty: 'Advanced'}
 ]
},
 {
 id: 'stage-4',
 stage: 4,
 title: 'Monitoring & Cloud',
 description: 'Observability and cloud delivery',
 color: 'bg-cyan-500',
 skills: [
 { id: 'monitoring-tools', name: 'Monitoring Tools', category: 'Observability', difficulty: 'Intermediate'},
 { id: 'cloud-deploy', name: 'Cloud Deployment', category: 'Cloud', difficulty: 'Advanced'}
 ]
}
 ]
},
 'ai-product': {
 careerId: 'ai-product',
 title: 'AI Product Engineer Roadmap',
 totalSkills: 6,
 stages: [
 {
 id: 'stage-1',
 stage: 1,
 title: 'LLM Integration',
 description: 'Using base models in apps',
 color: 'bg-fuchsia-500',
 skills: [
 { id: 'llm-integration', name: 'LLM Integration', category: 'LLMs', difficulty: 'Intermediate'},
 { id: 'prompt-eng', name: 'Prompt Engineering', category: 'LLMs', difficulty: 'Intermediate'}
 ]
},
 {
 id: 'stage-2',
 stage: 2,
 title: 'AI APIs',
 description: 'Working with vision, voice, and text APIs',
 color: 'bg-purple-500',
 skills: [
 { id: 'ai-apis', name: 'AI APIs', category: 'APIs', difficulty: 'Intermediate'}
 ]
},
 {
 id: 'stage-3',
 stage: 3,
 title: 'Knowledge Retrieval',
 description: 'Adding context to LLMs',
 color: 'bg-violet-500',
 skills: [
 { id: 'vector-dbs', name: 'Vector Databases', category: 'Database', difficulty: 'Advanced'},
 { id: 'rag', name: 'RAG Systems', category: 'Architecture', difficulty: 'Advanced'}
 ]
},
 {
 id: 'stage-4',
 stage: 4,
 title: 'AI Apps',
 description: 'End-to-end intelligent products',
 color: 'bg-fuchsia-600',
 skills: [
 { id: 'ai-apps', name: 'AI-Powered Applications', category: 'Projects', difficulty: 'Advanced'}
 ]
}
 ]
}
};
