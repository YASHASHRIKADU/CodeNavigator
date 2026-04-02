// Skill details with descriptions and resources
export const skillDetails = {
 'html-basics': {
 id: 'html-basics',
 name: 'HTML Basics',
 description: 'Learn the structure of web pages using HTML elements, tags, attributes, and document structure. HTML is the backbone of every web page.',
 difficulty: 'Beginner',
 duration: '1 week',
 category: 'HTML',
 resources: [
 { title: 'MDN Web Docs — HTML', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', free: true},
 { title: 'HTML Full Course — freeCodeCamp', type: 'video', url: 'https://www.youtube.com/watch?v=kUMe1FH4CHE', free: true},
 { title: 'HTML Tutorial — W3Schools', type: 'tutorial', url: 'https://www.w3schools.com/html/', free: true},
 { title: 'HTML Practice — Codepen', type: 'practice', url: 'https://codepen.io', free: true},
 ],
 prerequisites: [],
 nextSkills: ['html-forms', 'css-basics'],
},
 'css-basics': {
 id: 'css-basics',
 name: 'CSS Basics & Selectors',
 description: 'Style your HTML with CSS — colors, fonts, layout, selectors, the box model, and more. CSS makes your websites beautiful.',
 difficulty: 'Beginner',
 duration: '1–2 weeks',
 category: 'CSS',
 resources: [
 { title: 'MDN Web Docs — CSS', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS', free: true},
 { title: 'CSS Full Course — freeCodeCamp', type: 'video', url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc', free: true},
 { title: 'CSS-Tricks', type: 'tutorial', url: 'https://css-tricks.com', free: true},
 ],
 prerequisites: ['html-basics'],
 nextSkills: ['css-flexbox'],
},
 'css-flexbox': {
 id: 'css-flexbox',
 name: 'Flexbox & Grid',
 description: 'Master modern CSS layout systems. Flexbox handles one-dimensional layouts, Grid handles two-dimensional — together they make responsive design a breeze.',
 difficulty: 'Beginner',
 duration: '1 week',
 category: 'CSS',
 resources: [
 { title: 'A Complete Guide to Flexbox — CSS-Tricks', type: 'docs', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', free: true},
 { title: 'Flexbox Froggy (Game)', type: 'practice', url: 'https://flexboxfroggy.com', free: true},
 { title: 'Grid Garden (Game)', type: 'practice', url: 'https://cssgridgarden.com', free: true},
 ],
 prerequisites: ['css-basics'],
 nextSkills: ['js-fundamentals'],
},
 'js-fundamentals': {
 id: 'js-fundamentals',
 name: 'JS Fundamentals',
 description: 'Learn JavaScript: variables, functions, loops, conditionals, objects, arrays, and the fundamentals of programming logic.',
 difficulty: 'Beginner',
 duration: '2–3 weeks',
 category: 'JavaScript',
 resources: [
 { title: 'JavaScript.info', type: 'docs', url: 'https://javascript.info', free: true},
 { title: 'JS Full Course — freeCodeCamp', type: 'video', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', free: true},
 { title: 'Eloquent JavaScript (free book)', type: 'docs', url: 'https://eloquentjavascript.net', free: true},
 ],
 prerequisites: ['html-basics'],
 nextSkills: ['js-dom', 'js-es6'],
},
 'react-basics': {
 id: 'react-basics',
 name: 'React Basics & JSX',
 description: 'Get started with React — components, JSX, props, state, and rendering. React is the most popular frontend library for building UIs.',
 difficulty: 'Intermediate',
 duration: '2–3 weeks',
 category: 'React',
 resources: [
 { title: 'React Official Docs', type: 'docs', url: 'https://react.dev', free: true},
 { title: 'React Full Course — Traversy Media', type: 'video', url: 'https://www.youtube.com/watch?v=LDB4uaJ87e0', free: true},
 { title: 'React Tutorial — Scrimba', type: 'tutorial', url: 'https://scrimba.com/learn/learnreact', free: false},
 ],
 prerequisites: ['js-fundamentals', 'js-es6'],
 nextSkills: ['react-hooks', 'react-router'],
},
};

// Assessment skills grouped by career and category (for checkboxes)
export const assessmentSkills = {
 frontend: {
 'HTML & CSS': [
 { id: 'html-basics', name: 'HTML Basics'},
 { id: 'html-forms', name: 'HTML Forms & Semantics'},
 { id: 'css-basics', name: 'CSS Basics & Selectors'},
 { id: 'css-flexbox', name: 'Flexbox & Grid Layout'},
 { id: 'css-responsive', name: 'Responsive Design'},
 ],
 'JavaScript': [
 { id: 'js-fundamentals', name: 'JS Fundamentals'},
 { id: 'js-dom', name: 'DOM Manipulation'},
 { id: 'js-async', name: 'Async JS & Promises'},
 { id: 'js-es6', name: 'ES6+ Features'},
 { id: 'js-fetch', name: 'Fetch API'},
 ],
 'React': [
 { id: 'react-basics', name: 'React Basics & JSX'},
 { id: 'react-hooks', name: 'Hooks & State Management'},
 { id: 'react-router', name: 'React Router'},
 { id: 'react-api', name: 'API Integration with React'},
 ],
 'Tools': [
 { id: 'tailwind', name: 'Tailwind CSS'},
 { id: 'git', name: 'Git & GitHub'},
 { id: 'deploy', name: 'Deployment (Vercel/Netlify)'},
 ],
},
 backend: {
 'Node.js': [
 { id: 'node-basics', name: 'Node.js Basics'},
 { id: 'npm', name: 'NPM & Package Management'},
 { id: 'js-advanced', name: 'Advanced JavaScript'},
 ],
 'APIs': [
 { id: 'express', name: 'Express.js'},
 { id: 'rest-api', name: 'REST API Design'},
 { id: 'middleware', name: 'Middleware & Error Handling'},
 { id: 'auth-jwt', name: 'Authentication & JWT'},
 ],
 'Database': [
 { id: 'mongodb', name: 'MongoDB & Mongoose'},
 { id: 'sql', name: 'SQL Basics'},
 { id: 'data-modeling', name: 'Data Modeling'},
 ],
 'DevOps': [
 { id: 'docker', name: 'Docker Basics'},
 { id: 'ci-cd', name: 'CI/CD Pipelines'},
 { id: 'render', name: 'Deploy on Render'},
 ],
},
 fullstack: {
 'Frontend': [
 { id: 'html-css', name: 'HTML & CSS'},
 { id: 'js-fundamentals', name: 'JavaScript'},
 { id: 'react-basics', name: 'React Basics'},
 { id: 'tailwind', name: 'Tailwind CSS'},
 ],
 'Backend': [
 { id: 'node-express', name: 'Node.js & Express'},
 { id: 'rest-api', name: 'REST API Design'},
 { id: 'auth', name: 'Authentication'},
 ],
 'Database': [
 { id: 'mongodb', name: 'MongoDB'},
 { id: 'sql', name: 'SQL Basics'},
 { id: 'redux', name: 'State Management (Redux)'},
 ],
},
 datascience: {
 'Python': [
 { id: 'python-basics', name: 'Python Basics'},
 { id: 'numpy', name: 'NumPy'},
 { id: 'pandas', name: 'Pandas'},
 ],
 'Mathematics': [
 { id: 'statistics', name: 'Statistics & Probability'},
 { id: 'linear-algebra', name: 'Linear Algebra'},
 ],
 'Machine Learning': [
 { id: 'sklearn', name: 'Scikit-Learn'},
 { id: 'supervised', name: 'Supervised Learning'},
 { id: 'unsupervised', name: 'Unsupervised Learning'},
 ],
 'Deep Learning': [
 { id: 'tensorflow', name: 'TensorFlow / Keras'},
 { id: 'nlp', name: 'NLP Basics'},
 ],
},
 'ai-engineer': {
 'AI Foundation': [
 { id: 'python', name: 'Python Basics'},
 { id: 'math', name: 'Linear Algebra'},
 { id: 'numpy', name: 'NumPy & Pandas'}
 ],
 'Machine Learning': [
 { id: 'ml', name: 'Scikit-Learn'},
 { id: 'dl', name: 'Deep Learning'}
 ],
 'Generative AI': [
 { id: 'llm', name: 'LLMs'},
 { id: 'prompting', name: 'Prompt Engineering'}
 ],
 'Deployment': [
 { id: 'apis', name: 'AI APIs'},
 { id: 'deploy-ai', name: 'Deployment'}
 ]
},
 'data-engineer': {
 'Core': [
 { id: 'sql-adv', name: 'Advanced SQL'},
 { id: 'python-de', name: 'Python for DE'}
 ],
 'Architecture': [
 { id: 'dwh', name: 'Data Warehousing'},
 { id: 'etl', name: 'ETL Pipelines'}
 ],
 'Big Data': [
 { id: 'spark', name: 'Apache Spark'},
 { id: 'airflow', name: 'Airflow'}
 ],
 'Cloud': [
 { id: 'cloud-data', name: 'Cloud Data Platforms'}
 ]
},
 'cybersecurity': {
 'Basics': [
 { id: 'networking', name: 'Networking Fundamentals'},
 { id: 'linux-sec', name: 'Linux Basics'}
 ],
 'Offensive': [
 { id: 'ethical-hacking', name: 'Ethical Hacking'},
 { id: 'pentesting', name: 'Penetration Testing'}
 ],
 'Tools & Cloud': [
 { id: 'sec-tools', name: 'Security Tools'},
 { id: 'cloud-sec', name: 'Cloud Security'}
 ]
},
 'cloud-engineer': {
 'Fundamentals': [
 { id: 'linux-cloud', name: 'Linux'},
 { id: 'networking-cloud', name: 'Networking'}
 ],
 'Cloud': [
 { id: 'aws', name: 'AWS/Azure/GCP'},
 { id: 'cloud-arch', name: 'Cloud Architecture'}
 ],
 'Containers': [
 { id: 'docker-cloud', name: 'Containerization'},
 { id: 'k8s', name: 'Kubernetes'}
 ],
 'Pipelines': [
 { id: 'cicd-cloud', name: 'CI/CD Pipelines'}
 ]
},
 'devops': {
 'Core Tools': [
 { id: 'git-devops', name: 'Git'}
 ],
 'Containers': [
 { id: 'docker-devops', name: 'Docker'},
 { id: 'k8s-devops', name: 'Kubernetes'}
 ],
 'Automation': [
 { id: 'cicd', name: 'CI/CD Pipelines'},
 { id: 'iac', name: 'Infrastructure Automation'}
 ],
 'Operations': [
 { id: 'monitoring-tools', name: 'Monitoring Tools'},
 { id: 'cloud-deploy', name: 'Cloud Deployment'}
 ]
},
 'ai-product': {
 'LLMs': [
 { id: 'llm-integration', name: 'LLM Integration'},
 { id: 'prompt-eng', name: 'Prompt Engineering'}
 ],
 'APIs': [
 { id: 'ai-apis', name: 'AI APIs'}
 ],
 'Data Ops': [
 { id: 'vector-dbs', name: 'Vector Databases'},
 { id: 'rag', name: 'RAG Systems'}
 ],
 'Apps': [
 { id: 'ai-apps', name: 'AI-Powered Applications'}
 ]
}
};
