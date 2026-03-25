/**
 * Seed Script — populates MongoDB with Skills and Roadmaps.
 * Run with:  npm run seed  (from backend/ directory)
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Skill    = require('../models/Skill');
const Roadmap  = require('../models/Roadmap');

// ─── Skills Data ─────────────────────────────────────────────────────────────
const SKILLS = [
    // ══════════════════════════════════════════════════
    // HTML
    // ══════════════════════════════════════════════════
    {
        skillId: 'html-basics',
        skillName: 'HTML Basics',
        category: 'HTML',
        description: 'Learn the structure of web pages using HTML elements, tags, attributes, and document structure.',
        difficulty: 'Beginner',
        duration: '1 week',
        resources: [
            { title: 'MDN Web Docs — HTML', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', free: true },
            { title: 'HTML Full Course — freeCodeCamp', type: 'video', url: 'https://www.youtube.com/watch?v=kUMe1FH4CHE', free: true },
            { title: 'HTML Tutorial — W3Schools', type: 'tutorial', url: 'https://www.w3schools.com/html/', free: true },
        ],
    },
    {
        skillId: 'html-forms',
        skillName: 'HTML Forms & Semantics',
        category: 'HTML',
        description: 'Build accessible forms and use semantic HTML5 elements for better structure and SEO.',
        difficulty: 'Beginner',
        duration: '3 days',
        resources: [
            { title: 'MDN — HTML Forms', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms', free: true },
            { title: 'Semantic HTML — web.dev', type: 'article', url: 'https://web.dev/learn/html', free: true },
        ],
    },

    // ══════════════════════════════════════════════════
    // CSS
    // ══════════════════════════════════════════════════
    {
        skillId: 'css-basics',
        skillName: 'CSS Basics & Selectors',
        category: 'CSS',
        description: 'Style your HTML with CSS — colors, fonts, layout, selectors, and the box model.',
        difficulty: 'Beginner',
        duration: '1–2 weeks',
        resources: [
            { title: 'MDN Web Docs — CSS', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS', free: true },
            { title: 'CSS Full Course — freeCodeCamp', type: 'video', url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc', free: true },
            { title: 'CSS-Tricks', type: 'tutorial', url: 'https://css-tricks.com', free: true },
        ],
    },
    {
        skillId: 'css-flexbox',
        skillName: 'Flexbox & Grid Layout',
        category: 'CSS',
        description: 'Master CSS Flexbox and Grid for modern, responsive layout design.',
        difficulty: 'Beginner',
        duration: '1 week',
        resources: [
            { title: 'A Complete Guide to Flexbox — CSS-Tricks', type: 'docs', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', free: true },
            { title: 'Flexbox Froggy (Game)', type: 'practice', url: 'https://flexboxfroggy.com', free: true },
            { title: 'Grid Garden (Game)', type: 'practice', url: 'https://cssgridgarden.com', free: true },
        ],
    },
    {
        skillId: 'css-responsive',
        skillName: 'Responsive Design',
        category: 'CSS',
        description: 'Make websites work on all screen sizes using media queries, fluid grids, and mobile-first design.',
        difficulty: 'Beginner',
        duration: '1 week',
        resources: [
            { title: 'Responsive Web Design — freeCodeCamp', type: 'course', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', free: true },
            { title: 'Responsive Design — web.dev', type: 'docs', url: 'https://web.dev/learn/design', free: true },
        ],
    },

    // ══════════════════════════════════════════════════
    // JavaScript
    // ══════════════════════════════════════════════════
    {
        skillId: 'js-fundamentals',
        skillName: 'JavaScript Fundamentals',
        category: 'JavaScript',
        description: 'Learn JavaScript: variables, functions, loops, conditionals, objects, arrays, and programming logic.',
        difficulty: 'Beginner',
        duration: '2–3 weeks',
        resources: [
            { title: 'JavaScript.info', type: 'docs', url: 'https://javascript.info', free: true },
            { title: 'JS Full Course — freeCodeCamp', type: 'video', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', free: true },
            { title: 'Eloquent JavaScript (free book)', type: 'docs', url: 'https://eloquentjavascript.net', free: true },
        ],
    },
    {
        skillId: 'js-dom',
        skillName: 'DOM Manipulation',
        category: 'JavaScript',
        description: 'Interact with the browser DOM to select, create, and modify HTML elements dynamically.',
        difficulty: 'Beginner',
        duration: '1 week',
        resources: [
            { title: 'MDN — DOM Introduction', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction', free: true },
            { title: 'JavaScript DOM Crash Course — Traversy Media', type: 'video', url: 'https://www.youtube.com/watch?v=0ik6X4DJKCc', free: true },
        ],
    },
    {
        skillId: 'js-es6',
        skillName: 'ES6+ Features',
        category: 'JavaScript',
        description: 'Modern JavaScript: arrow functions, destructuring, spread, async/await, modules, and more.',
        difficulty: 'Intermediate',
        duration: '1 week',
        resources: [
            { title: 'ES6 Features — javascript.info', type: 'docs', url: 'https://javascript.info/es-modern', free: true },
        ],
    },
    {
        skillId: 'js-async',
        skillName: 'Async JS & Promises',
        category: 'JavaScript',
        description: 'Understand asynchronous programming with callbacks, promises, and async/await.',
        difficulty: 'Intermediate',
        duration: '1 week',
        resources: [
            { title: 'Async JavaScript — javascript.info', type: 'docs', url: 'https://javascript.info/async', free: true },
        ],
    },

    // ══════════════════════════════════════════════════
    // React
    // ══════════════════════════════════════════════════
    {
        skillId: 'react-basics',
        skillName: 'React Basics & JSX',
        category: 'React',
        description: 'Build UIs with React components, JSX, props, and state.',
        difficulty: 'Intermediate',
        duration: '2–3 weeks',
        resources: [
            { title: 'React Official Docs', type: 'docs', url: 'https://react.dev', free: true },
            { title: 'React Full Course — Traversy Media', type: 'video', url: 'https://www.youtube.com/watch?v=LDB4uaJ87e0', free: true },
        ],
    },
    {
        skillId: 'react-hooks',
        skillName: 'Hooks & State Management',
        category: 'React',
        description: 'Master built-in hooks (useState, useEffect, useContext, useRef, useMemo) for powerful React apps.',
        difficulty: 'Intermediate',
        duration: '1–2 weeks',
        resources: [
            { title: 'React Hooks — Official Docs', type: 'docs', url: 'https://react.dev/reference/react', free: true },
        ],
    },
    {
        skillId: 'react-router',
        skillName: 'React Router',
        category: 'React',
        description: 'Build multi-page SPAs with client-side routing using React Router v6.',
        difficulty: 'Intermediate',
        duration: '3 days',
        resources: [
            { title: 'React Router Docs', type: 'docs', url: 'https://reactrouter.com', free: true },
        ],
    },
    {
        skillId: 'react-api',
        skillName: 'API Integration with React',
        category: 'React',
        description: 'Connect React apps to real APIs: data fetching, loading states, error handling.',
        difficulty: 'Intermediate',
        duration: '1 week',
        resources: [
            { title: 'Fetching Data in React — react.dev', type: 'docs', url: 'https://react.dev/learn/synchronizing-with-effects', free: true },
        ],
    },

    // ══════════════════════════════════════════════════
    // Tools (shared)
    // ══════════════════════════════════════════════════
    {
        skillId: 'tailwind',
        skillName: 'Tailwind CSS',
        category: 'Tools',
        description: 'Build modern UIs rapidly with utility-first CSS using Tailwind CSS.',
        difficulty: 'Beginner',
        duration: '3 days',
        resources: [
            { title: 'Tailwind CSS Docs', type: 'docs', url: 'https://tailwindcss.com/docs', free: true },
        ],
    },
    {
        skillId: 'git',
        skillName: 'Git & GitHub',
        category: 'Tools',
        description: 'Version control with Git — commits, branches, merging, pull requests, and GitHub workflows.',
        difficulty: 'Beginner',
        duration: '3 days',
        resources: [
            { title: 'Git Documentation', type: 'docs', url: 'https://git-scm.com/doc', free: true },
            { title: 'Git & GitHub Crash Course — Traversy Media', type: 'video', url: 'https://www.youtube.com/watch?v=SWYqp7iY_Tc', free: true },
        ],
    },
    {
        skillId: 'deploy-fe',
        skillName: 'Deployment (Vercel / Netlify)',
        category: 'Tools',
        description: 'Deploy React apps to the internet using Vercel or Netlify.',
        difficulty: 'Beginner',
        duration: '1 day',
        resources: [
            { title: 'Vercel Docs', type: 'docs', url: 'https://vercel.com/docs', free: true },
            { title: 'Netlify Docs', type: 'docs', url: 'https://docs.netlify.com', free: true },
        ],
    },

    // ══════════════════════════════════════════════════
    // Node.js / Backend
    // ══════════════════════════════════════════════════
    {
        skillId: 'node-basics',
        skillName: 'Node.js Basics',
        category: 'Node.js',
        description: 'Run JavaScript on the server with Node.js — event loop, modules, file system, and npm.',
        difficulty: 'Intermediate',
        duration: '1–2 weeks',
        resources: [
            { title: 'Node.js Official Docs', type: 'docs', url: 'https://nodejs.org/en/docs/', free: true },
            { title: 'Node.js Crash Course — Traversy Media', type: 'video', url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4', free: true },
        ],
    },
    {
        skillId: 'express',
        skillName: 'Express.js',
        category: 'Node.js',
        description: 'Build web APIs and servers with Express — routing, middleware, and request handling.',
        difficulty: 'Intermediate',
        duration: '1–2 weeks',
        resources: [
            { title: 'Express Docs', type: 'docs', url: 'https://expressjs.com', free: true },
            { title: 'Express Crash Course — Traversy Media', type: 'video', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE', free: true },
        ],
    },
    {
        skillId: 'rest-api',
        skillName: 'REST API Design',
        category: 'APIs',
        description: 'Design RESTful APIs: HTTP methods, status codes, resource naming, and best practices.',
        difficulty: 'Intermediate',
        duration: '1 week',
        resources: [
            { title: 'REST API Design Best Practices — freeCodeCamp', type: 'article', url: 'https://www.freecodecamp.org/news/rest-api-best-practices/', free: true },
        ],
    },
    {
        skillId: 'auth-jwt',
        skillName: 'Authentication & JWT',
        category: 'Security',
        description: 'Implement secure user authentication with JWTs, bcrypt password hashing, and session management.',
        difficulty: 'Intermediate',
        duration: '1 week',
        resources: [
            { title: 'JWT Introduction', type: 'docs', url: 'https://jwt.io/introduction', free: true },
            { title: 'Node.js Auth with JWT — Traversy Media', type: 'video', url: 'https://www.youtube.com/watch?v=enopDSs3DRw', free: true },
        ],
    },
    {
        skillId: 'mongodb',
        skillName: 'MongoDB & Mongoose',
        category: 'Database',
        description: 'NoSQL database: CRUD operations, schema design with Mongoose, indexing, and Atlas setup.',
        difficulty: 'Intermediate',
        duration: '1–2 weeks',
        resources: [
            { title: 'MongoDB Docs', type: 'docs', url: 'https://www.mongodb.com/docs/', free: true },
            { title: 'Mongoose Docs', type: 'docs', url: 'https://mongoosejs.com/docs/', free: true },
        ],
    },
    {
        skillId: 'sql',
        skillName: 'SQL & Relational Databases',
        category: 'Database',
        description: 'Query relational databases with SQL — SELECT, JOIN, GROUP BY, transactions, and indexing.',
        difficulty: 'Beginner',
        duration: '1–2 weeks',
        resources: [
            { title: 'SQLZoo', type: 'practice', url: 'https://sqlzoo.net', free: true },
            { title: 'Mode SQL Tutorial', type: 'tutorial', url: 'https://mode.com/sql-tutorial/', free: true },
        ],
    },
    {
        skillId: 'api-security',
        skillName: 'API Security Best Practices',
        category: 'Security',
        description: 'Secure APIs with rate limiting, input validation, CORS, HTTPS, and OWASP guidelines.',
        difficulty: 'Intermediate',
        duration: '1 week',
        resources: [
            { title: 'OWASP API Security Top 10', type: 'docs', url: 'https://owasp.org/www-project-api-security/', free: true },
            { title: 'API Security Checklist', type: 'article', url: 'https://github.com/shieldfy/API-Security-Checklist', free: true },
        ],
    },
    {
        skillId: 'docker',
        skillName: 'Docker & Containers',
        category: 'DevOps',
        description: 'Containerize apps with Docker — images, containers, Dockerfile, and docker-compose.',
        difficulty: 'Intermediate',
        duration: '1 week',
        resources: [
            { title: 'Docker Docs', type: 'docs', url: 'https://docs.docker.com', free: true },
            { title: 'Docker Crash Course — TechWorld with Nana', type: 'video', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', free: true },
        ],
    },
    {
        skillId: 'ci-cd',
        skillName: 'CI/CD Pipelines',
        category: 'DevOps',
        description: 'Automate testing and deployment with GitHub Actions, Jenkins, or GitLab CI.',
        difficulty: 'Intermediate',
        duration: '1 week',
        resources: [
            { title: 'GitHub Actions Docs', type: 'docs', url: 'https://docs.github.com/en/actions', free: true },
        ],
    },

    // ══════════════════════════════════════════════════
    // Data Science / Python
    // ══════════════════════════════════════════════════
    {
        skillId: 'python-basics',
        skillName: 'Python Programming',
        category: 'Python',
        description: 'Core Python syntax: variables, loops, functions, modules, OOP, and common libraries.',
        difficulty: 'Beginner',
        duration: '2–3 weeks',
        resources: [
            { title: 'Python Official Tutorial', type: 'docs', url: 'https://docs.python.org/3/tutorial/', free: true },
            { title: 'Python Full Course — freeCodeCamp', type: 'video', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', free: true },
        ],
    },
    {
        skillId: 'data-cleaning',
        skillName: 'Data Cleaning & Wrangling',
        category: 'Data Science',
        description: 'Handle missing data, outliers, data types, and transformations to prepare datasets for analysis.',
        difficulty: 'Beginner',
        duration: '1 week',
        resources: [
            { title: 'Data Cleaning with Pandas — Kaggle', type: 'course', url: 'https://www.kaggle.com/learn/data-cleaning', free: true },
        ],
    },
    {
        skillId: 'numpy-pandas',
        skillName: 'Pandas & NumPy',
        category: 'Data Science',
        description: 'Numerical computing with NumPy arrays and data manipulation with Pandas DataFrames.',
        difficulty: 'Intermediate',
        duration: '1–2 weeks',
        resources: [
            { title: 'NumPy Docs', type: 'docs', url: 'https://numpy.org/doc/', free: true },
            { title: 'Pandas Docs', type: 'docs', url: 'https://pandas.pydata.org/docs/', free: true },
            { title: 'Pandas Tutorial — Kaggle', type: 'course', url: 'https://www.kaggle.com/learn/pandas', free: true },
        ],
    },
    {
        skillId: 'data-visualization',
        skillName: 'Data Visualization',
        category: 'Data Science',
        description: 'Create charts, graphs, and dashboards with Matplotlib, Seaborn, and Plotly.',
        difficulty: 'Intermediate',
        duration: '1 week',
        resources: [
            { title: 'Matplotlib Docs', type: 'docs', url: 'https://matplotlib.org/stable/tutorials/index.html', free: true },
            { title: 'Data Visualization — Kaggle', type: 'course', url: 'https://www.kaggle.com/learn/data-visualization', free: true },
        ],
    },
    {
        skillId: 'statistics',
        skillName: 'Statistics & Probability',
        category: 'Mathematics',
        description: 'Statistical foundations: mean, variance, hypothesis testing, and probability distributions.',
        difficulty: 'Intermediate',
        duration: '2 weeks',
        resources: [
            { title: 'Statistics by Khan Academy', type: 'course', url: 'https://www.khanacademy.org/math/statistics-probability', free: true },
        ],
    },
    {
        skillId: 'ml-basics',
        skillName: 'Machine Learning Basics',
        category: 'Machine Learning',
        description: 'Supervised & unsupervised learning concepts — regression, classification, clustering.',
        difficulty: 'Intermediate',
        duration: '2–3 weeks',
        resources: [
            { title: 'ML Crash Course — Google', type: 'course', url: 'https://developers.google.com/machine-learning/crash-course', free: true },
            { title: 'Scikit-Learn Docs', type: 'docs', url: 'https://scikit-learn.org/stable/user_guide.html', free: true },
        ],
    },
    {
        skillId: 'model-evaluation',
        skillName: 'Model Evaluation & Tuning',
        category: 'Machine Learning',
        description: 'Evaluate ML models with cross-validation, accuracy, precision/recall, F1, and hyperparameter tuning.',
        difficulty: 'Intermediate',
        duration: '1–2 weeks',
        resources: [
            { title: 'Evaluating ML Models — fast.ai', type: 'course', url: 'https://course.fast.ai', free: true },
            { title: 'Model Selection — Scikit-Learn', type: 'docs', url: 'https://scikit-learn.org/stable/model_selection.html', free: true },
        ],
    },

    // ══════════════════════════════════════════════════
    // AI Engineering
    // ══════════════════════════════════════════════════
    {
        skillId: 'llm',
        skillName: 'Large Language Models (LLMs)',
        category: 'AI',
        description: 'Understand transformer architecture, pre-training, fine-tuning, and working with LLM APIs.',
        difficulty: 'Advanced',
        duration: '3 weeks',
        resources: [
            { title: 'Hugging Face Course', type: 'course', url: 'https://huggingface.co/course', free: true },
        ],
    },
    {
        skillId: 'prompting',
        skillName: 'Prompt Engineering',
        category: 'AI',
        description: 'Write effective prompts for LLMs: zero-shot, few-shot, chain-of-thought, ReAct patterns.',
        difficulty: 'Intermediate',
        duration: '1 week',
        resources: [
            { title: 'Prompt Engineering Guide', type: 'docs', url: 'https://www.promptingguide.ai', free: true },
        ],
    },
    {
        skillId: 'deploy-ai',
        skillName: 'AI Model Deployment',
        category: 'AI',
        description: 'Deploy ML/AI models to production via REST APIs, cloud platforms, and containerization.',
        difficulty: 'Advanced',
        duration: '2 weeks',
        resources: [
            { title: 'FastAPI Docs', type: 'docs', url: 'https://fastapi.tiangolo.com', free: true },
        ],
    },
    {
        skillId: 'tensorflow',
        skillName: 'TensorFlow & Keras',
        category: 'Deep Learning',
        description: 'Build and train neural networks with TensorFlow and the Keras high-level API.',
        difficulty: 'Advanced',
        duration: '3–4 weeks',
        resources: [
            { title: 'TensorFlow Docs', type: 'docs', url: 'https://www.tensorflow.org/learn', free: true },
        ],
    },

    // ══════════════════════════════════════════════════
    // Cybersecurity
    // ══════════════════════════════════════════════════
    {
        skillId: 'networking-fundamentals',
        skillName: 'Networking Fundamentals',
        category: 'Networking',
        description: 'TCP/IP, DNS, HTTP/HTTPS, OSI model, subnetting, firewalls, and network protocols.',
        difficulty: 'Beginner',
        duration: '2 weeks',
        resources: [
            { title: 'Computer Networking — freeCodeCamp', type: 'video', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', free: true },
            { title: 'Networking Fundamentals — Cisco', type: 'course', url: 'https://skillsforall.com/course/networking-basics', free: true },
        ],
    },
    {
        skillId: 'linux-basics',
        skillName: 'Linux Basics',
        category: 'Operating Systems',
        description: 'Navigate and administer Linux: shell commands, file permissions, processes, users, and scripting.',
        difficulty: 'Beginner',
        duration: '1–2 weeks',
        resources: [
            { title: 'The Linux Command Line (free book)', type: 'docs', url: 'https://linuxcommand.org/tlcl.php', free: true },
            { title: 'Linux Basics — OverTheWire', type: 'practice', url: 'https://overthewire.org/wargames/bandit/', free: true },
        ],
    },
    {
        skillId: 'ethical-hacking',
        skillName: 'Ethical Hacking',
        category: 'Cybersecurity',
        description: 'Penetration testing methodology, reconnaissance, exploitation, and reporting using legal techniques.',
        difficulty: 'Intermediate',
        duration: '3–4 weeks',
        resources: [
            { title: 'Ethical Hacking Course — freeCodeCamp', type: 'video', url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', free: true },
            { title: 'TryHackMe — Beginner Path', type: 'practice', url: 'https://tryhackme.com/path/outline/beginner', free: true },
        ],
    },
    {
        skillId: 'security-tools',
        skillName: 'Security Tools',
        category: 'Cybersecurity',
        description: 'Use tools like Nmap, Wireshark, Metasploit, Burp Suite, and John the Ripper for security testing.',
        difficulty: 'Intermediate',
        duration: '2 weeks',
        resources: [
            { title: 'Kali Linux Tools Documentation', type: 'docs', url: 'https://www.kali.org/tools/', free: true },
            { title: 'Wireshark User Guide', type: 'docs', url: 'https://www.wireshark.org/docs/', free: true },
        ],
    },
    {
        skillId: 'penetration-testing',
        skillName: 'Penetration Testing',
        category: 'Cybersecurity',
        description: 'Perform structured pen tests: web apps, networks, and systems. Report findings professionally.',
        difficulty: 'Advanced',
        duration: '4 weeks',
        resources: [
            { title: 'PentesterLab', type: 'practice', url: 'https://pentesterlab.com', free: true },
            { title: 'Hack The Box', type: 'practice', url: 'https://www.hackthebox.com', free: true },
        ],
    },
    {
        skillId: 'cloud-security',
        skillName: 'Cloud Security',
        category: 'Cybersecurity',
        description: 'Secure cloud infrastructure on AWS/Azure/GCP: IAM, encryption, VPCs, compliance, and threat detection.',
        difficulty: 'Advanced',
        duration: '2–3 weeks',
        resources: [
            { title: 'AWS Security Learning Plan', type: 'course', url: 'https://aws.amazon.com/training/learn-about/security/', free: true },
            { title: 'Cloud Security Alliance Resources', type: 'docs', url: 'https://cloudsecurityalliance.org/research/', free: true },
        ],
    },

    // ══════════════════════════════════════════════════
    // Cloud / DevOps
    // ══════════════════════════════════════════════════
    {
        skillId: 'cloud-providers',
        skillName: 'Cloud Providers (AWS / GCP / Azure)',
        category: 'Cloud',
        description: 'Core cloud services: compute (EC2/VM), storage (S3/Blob), networking, and managed databases.',
        difficulty: 'Intermediate',
        duration: '2–3 weeks',
        resources: [
            { title: 'AWS Free Tier', type: 'practice', url: 'https://aws.amazon.com/free/', free: true },
            { title: 'Google Cloud Skills Boost', type: 'course', url: 'https://cloudskillsboost.google', free: true },
        ],
    },
    {
        skillId: 'kubernetes',
        skillName: 'Kubernetes',
        category: 'DevOps',
        description: 'Orchestrate containers at scale with Kubernetes — pods, deployments, services, and Helm charts.',
        difficulty: 'Advanced',
        duration: '2–3 weeks',
        resources: [
            { title: 'Kubernetes Docs', type: 'docs', url: 'https://kubernetes.io/docs/home/', free: true },
            { title: 'Kubernetes Crash Course — TechWorld with Nana', type: 'video', url: 'https://www.youtube.com/watch?v=X48VuDVv0do', free: true },
        ],
    },
    {
        skillId: 'infrastructure-as-code',
        skillName: 'Infrastructure as Code (Terraform)',
        category: 'DevOps',
        description: 'Provision and manage cloud infrastructure as code using Terraform and HCL.',
        difficulty: 'Intermediate',
        duration: '2 weeks',
        resources: [
            { title: 'Terraform Docs', type: 'docs', url: 'https://developer.hashicorp.com/terraform/docs', free: true },
            { title: 'Terraform Crash Course — freeCodeCamp', type: 'video', url: 'https://www.youtube.com/watch?v=SLB_c_ayRMo', free: true },
        ],
    },
    {
        skillId: 'monitoring',
        skillName: 'Monitoring & Observability',
        category: 'DevOps',
        description: 'Set up monitoring with Prometheus, Grafana, and ELK Stack. Configure alerts and dashboards.',
        difficulty: 'Intermediate',
        duration: '1–2 weeks',
        resources: [
            { title: 'Prometheus Docs', type: 'docs', url: 'https://prometheus.io/docs/', free: true },
            { title: 'Grafana Docs', type: 'docs', url: 'https://grafana.com/docs/', free: true },
        ],
    },

    // ══════════════════════════════════════════════════
    // Data Engineering
    // ══════════════════════════════════════════════════
    {
        skillId: 'data-pipelines',
        skillName: 'Data Pipelines & ETL',
        category: 'Data Engineering',
        description: 'Build ETL pipelines with Apache Airflow, Luigi, or Prefect to move and transform data at scale.',
        difficulty: 'Intermediate',
        duration: '2 weeks',
        resources: [
            { title: 'Apache Airflow Docs', type: 'docs', url: 'https://airflow.apache.org/docs/', free: true },
        ],
    },
    {
        skillId: 'big-data',
        skillName: 'Big Data (Spark / Kafka)',
        category: 'Data Engineering',
        description: 'Process large-scale data with Apache Spark and stream data in real-time with Kafka.',
        difficulty: 'Advanced',
        duration: '3 weeks',
        resources: [
            { title: 'Apache Spark Docs', type: 'docs', url: 'https://spark.apache.org/docs/latest/', free: true },
            { title: 'Kafka Documentation', type: 'docs', url: 'https://kafka.apache.org/documentation/', free: true },
        ],
    },
    {
        skillId: 'data-warehousing',
        skillName: 'Data Warehousing',
        category: 'Data Engineering',
        description: 'Design and query data warehouses with BigQuery, Redshift, or Snowflake.',
        difficulty: 'Intermediate',
        duration: '1–2 weeks',
        resources: [
            { title: 'BigQuery Docs', type: 'docs', url: 'https://cloud.google.com/bigquery/docs', free: true },
        ],
    },
];

// ─── Roadmaps Data ────────────────────────────────────────────────────────────
const ROADMAPS = [
    // ─────────────────────────────────────────────────────
    // Frontend Developer
    // ─────────────────────────────────────────────────────
    {
        career: 'frontend',
        title: 'Frontend Developer',
        totalSkills: 17,
        stages: [
            {
                stage: 1,
                title: 'Web Foundations',
                description: 'Master HTML and CSS to build structured, styled web pages.',
                skills: [
                    { skillId: 'html-basics',    name: 'HTML Basics',            difficulty: 'Beginner' },
                    { skillId: 'html-forms',     name: 'HTML Forms & Semantics', difficulty: 'Beginner' },
                    { skillId: 'css-basics',     name: 'CSS Basics & Selectors', difficulty: 'Beginner' },
                    { skillId: 'css-flexbox',    name: 'Flexbox & Grid',         difficulty: 'Beginner' },
                    { skillId: 'css-responsive', name: 'Responsive Design',      difficulty: 'Beginner' },
                ],
            },
            {
                stage: 2,
                title: 'JavaScript Core',
                description: 'Learn the language of the web — from fundamentals to async programming.',
                skills: [
                    { skillId: 'js-fundamentals', name: 'JavaScript Fundamentals', difficulty: 'Beginner' },
                    { skillId: 'js-dom',          name: 'DOM Manipulation',         difficulty: 'Beginner' },
                    { skillId: 'js-es6',          name: 'ES6+ Features',            difficulty: 'Intermediate' },
                    { skillId: 'js-async',        name: 'Async JS & Promises',      difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 3,
                title: 'React & Ecosystem',
                description: 'Build powerful single-page apps with React.',
                skills: [
                    { skillId: 'react-basics',  name: 'React Basics & JSX',        difficulty: 'Intermediate' },
                    { skillId: 'react-hooks',   name: 'Hooks & State Management',  difficulty: 'Intermediate' },
                    { skillId: 'react-router',  name: 'React Router',              difficulty: 'Intermediate' },
                    { skillId: 'react-api',     name: 'API Integration with React', difficulty: 'Intermediate' },
                    { skillId: 'tailwind',      name: 'Tailwind CSS',              difficulty: 'Beginner' },
                ],
            },
            {
                stage: 4,
                title: 'Tools & Deployment',
                description: 'Ship your projects professionally using Git and cloud deployment.',
                skills: [
                    { skillId: 'git',       name: 'Git & GitHub',             difficulty: 'Beginner' },
                    { skillId: 'deploy-fe', name: 'Deployment (Vercel/Netlify)', difficulty: 'Beginner' },
                    { skillId: 'ci-cd',     name: 'CI/CD Pipelines',          difficulty: 'Intermediate' },
                ],
            },
        ],
    },

    // ─────────────────────────────────────────────────────
    // Backend Developer
    // ─────────────────────────────────────────────────────
    {
        career: 'backend',
        title: 'Backend Developer',
        totalSkills: 11,
        stages: [
            {
                stage: 1,
                title: 'Server Foundations',
                description: 'Build robust HTTP servers and APIs with Node.js and Express.',
                skills: [
                    { skillId: 'node-basics', name: 'Node.js',            difficulty: 'Intermediate' },
                    { skillId: 'express',     name: 'Express.js',          difficulty: 'Intermediate' },
                    { skillId: 'rest-api',    name: 'REST API Design',     difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 2,
                title: 'Databases',
                description: 'Store and query data with SQL and NoSQL databases.',
                skills: [
                    { skillId: 'mongodb', name: 'MongoDB',                 difficulty: 'Intermediate' },
                    { skillId: 'sql',     name: 'SQL & Relational Databases', difficulty: 'Beginner' },
                ],
            },
            {
                stage: 3,
                title: 'Security & Auth',
                description: 'Protect your APIs with authentication and security best practices.',
                skills: [
                    { skillId: 'auth-jwt',     name: 'Authentication & JWT',       difficulty: 'Intermediate' },
                    { skillId: 'api-security', name: 'API Security Best Practices', difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 4,
                title: 'DevOps & Deployment',
                description: 'Containerize and automate delivery of your backend services.',
                skills: [
                    { skillId: 'docker', name: 'Docker & Containers', difficulty: 'Intermediate' },
                    { skillId: 'ci-cd',  name: 'CI/CD Pipelines',     difficulty: 'Intermediate' },
                    { skillId: 'git',    name: 'Git & GitHub',         difficulty: 'Beginner' },
                    { skillId: 'monitoring', name: 'Monitoring & Observability', difficulty: 'Intermediate' },
                ],
            },
        ],
    },

    // ─────────────────────────────────────────────────────
    // Full Stack Developer
    // ─────────────────────────────────────────────────────
    {
        career: 'fullstack',
        title: 'Full Stack Developer',
        totalSkills: 16,
        stages: [
            {
                stage: 1,
                title: 'Frontend Foundation',
                description: 'Build the client side of web applications.',
                skills: [
                    { skillId: 'html-basics',     name: 'HTML Basics',            difficulty: 'Beginner' },
                    { skillId: 'css-basics',      name: 'CSS Basics & Selectors', difficulty: 'Beginner' },
                    { skillId: 'js-fundamentals', name: 'JavaScript Fundamentals', difficulty: 'Beginner' },
                    { skillId: 'react-basics',    name: 'React Basics & JSX',     difficulty: 'Intermediate' },
                    { skillId: 'tailwind',        name: 'Tailwind CSS',           difficulty: 'Beginner' },
                ],
            },
            {
                stage: 2,
                title: 'Backend & APIs',
                description: 'Create server-side logic and RESTful APIs.',
                skills: [
                    { skillId: 'node-basics', name: 'Node.js',         difficulty: 'Intermediate' },
                    { skillId: 'express',     name: 'Express.js',       difficulty: 'Intermediate' },
                    { skillId: 'rest-api',    name: 'REST API Design',  difficulty: 'Intermediate' },
                    { skillId: 'auth-jwt',    name: 'Authentication & JWT', difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 3,
                title: 'Databases',
                description: 'Persist data with SQL and NoSQL databases.',
                skills: [
                    { skillId: 'mongodb', name: 'MongoDB', difficulty: 'Intermediate' },
                    { skillId: 'sql',     name: 'SQL & Relational Databases', difficulty: 'Beginner' },
                ],
            },
            {
                stage: 4,
                title: 'DevOps & Launch',
                description: 'Ship your full-stack app with CI/CD and cloud deployment.',
                skills: [
                    { skillId: 'git',       name: 'Git & GitHub',             difficulty: 'Beginner' },
                    { skillId: 'docker',    name: 'Docker & Containers',      difficulty: 'Intermediate' },
                    { skillId: 'deploy-fe', name: 'Deployment (Vercel/Netlify)', difficulty: 'Beginner' },
                    { skillId: 'ci-cd',     name: 'CI/CD Pipelines',          difficulty: 'Intermediate' },
                ],
            },
        ],
    },

    // ─────────────────────────────────────────────────────
    // Data Scientist
    // ─────────────────────────────────────────────────────
    {
        career: 'datascience',
        title: 'Data Scientist',
        totalSkills: 13,
        stages: [
            {
                stage: 1,
                title: 'Python & Math Foundations',
                description: 'Build a strong base in programming and statistics.',
                skills: [
                    { skillId: 'python-basics', name: 'Python Programming',      difficulty: 'Beginner' },
                    { skillId: 'statistics',    name: 'Statistics & Probability', difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 2,
                title: 'Data Analysis',
                description: 'Explore, clean, and visualize datasets.',
                skills: [
                    { skillId: 'data-cleaning',    name: 'Data Cleaning & Wrangling', difficulty: 'Beginner' },
                    { skillId: 'numpy-pandas',     name: 'Pandas & NumPy',           difficulty: 'Intermediate' },
                    { skillId: 'data-visualization', name: 'Data Visualization',    difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 3,
                title: 'Machine Learning',
                description: 'Build, train, and evaluate predictive models.',
                skills: [
                    { skillId: 'ml-basics',       name: 'Machine Learning Basics', difficulty: 'Intermediate' },
                    { skillId: 'model-evaluation', name: 'Model Evaluation & Tuning', difficulty: 'Intermediate' },
                    { skillId: 'tensorflow',      name: 'TensorFlow & Keras',      difficulty: 'Advanced' },
                ],
            },
            {
                stage: 4,
                title: 'AI & Deployment',
                description: 'Deploy models and work with modern AI frameworks.',
                skills: [
                    { skillId: 'llm',       name: 'Large Language Models',  difficulty: 'Advanced' },
                    { skillId: 'prompting', name: 'Prompt Engineering',     difficulty: 'Intermediate' },
                    { skillId: 'deploy-ai', name: 'AI Model Deployment',    difficulty: 'Advanced' },
                    { skillId: 'docker',    name: 'Docker & Containers',    difficulty: 'Intermediate' },
                    { skillId: 'git',       name: 'Git & GitHub',           difficulty: 'Beginner' },
                ],
            },
        ],
    },

    // ─────────────────────────────────────────────────────
    // Cybersecurity Engineer
    // ─────────────────────────────────────────────────────
    {
        career: 'cybersecurity',
        title: 'Cybersecurity Engineer',
        totalSkills: 10,
        stages: [
            {
                stage: 1,
                title: 'Networking & OS Basics',
                description: 'Understand how networks and operating systems work — the foundation of security.',
                skills: [
                    { skillId: 'networking-fundamentals', name: 'Networking Fundamentals', difficulty: 'Beginner' },
                    { skillId: 'linux-basics',            name: 'Linux Basics',            difficulty: 'Beginner' },
                ],
            },
            {
                stage: 2,
                title: 'Security Fundamentals',
                description: 'Learn authentication, encryption, and secure API principles.',
                skills: [
                    { skillId: 'auth-jwt',     name: 'Authentication & JWT',       difficulty: 'Intermediate' },
                    { skillId: 'api-security', name: 'API Security Best Practices', difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 3,
                title: 'Ethical Hacking & Tools',
                description: 'Perform ethical hacking and use industry-standard security tools.',
                skills: [
                    { skillId: 'ethical-hacking',  name: 'Ethical Hacking',   difficulty: 'Intermediate' },
                    { skillId: 'security-tools',   name: 'Security Tools',    difficulty: 'Intermediate' },
                    { skillId: 'penetration-testing', name: 'Penetration Testing', difficulty: 'Advanced' },
                ],
            },
            {
                stage: 4,
                title: 'Cloud Security & Compliance',
                description: 'Secure cloud infrastructure and apply compliance frameworks.',
                skills: [
                    { skillId: 'cloud-security',    name: 'Cloud Security',           difficulty: 'Advanced' },
                    { skillId: 'docker',            name: 'Docker & Containers',      difficulty: 'Intermediate' },
                    { skillId: 'git',               name: 'Git & GitHub',             difficulty: 'Beginner' },
                ],
            },
        ],
    },

    // ─────────────────────────────────────────────────────
    // AI Engineer
    // ─────────────────────────────────────────────────────
    {
        career: 'ai-engineer',
        title: 'AI Engineer (2026)',
        totalSkills: 11,
        stages: [
            {
                stage: 1,
                title: 'AI Foundations',
                description: 'Build a strong base in Python, statistics, and data manipulation.',
                skills: [
                    { skillId: 'python-basics', name: 'Python Programming',      difficulty: 'Beginner' },
                    { skillId: 'numpy-pandas',  name: 'Pandas & NumPy',          difficulty: 'Intermediate' },
                    { skillId: 'statistics',    name: 'Statistics & Probability', difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 2,
                title: 'Machine Learning',
                description: 'Train and evaluate classic and deep learning models.',
                skills: [
                    { skillId: 'ml-basics',   name: 'Machine Learning Basics', difficulty: 'Intermediate' },
                    { skillId: 'tensorflow',  name: 'TensorFlow & Keras',      difficulty: 'Advanced' },
                ],
            },
            {
                stage: 3,
                title: 'Generative AI & LLMs',
                description: 'Work with state-of-the-art language models and prompt engineering.',
                skills: [
                    { skillId: 'llm',       name: 'Large Language Models', difficulty: 'Advanced' },
                    { skillId: 'prompting', name: 'Prompt Engineering',    difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 4,
                title: 'Deployment & Production',
                description: 'Deploy and operate AI systems in production environments.',
                skills: [
                    { skillId: 'deploy-ai', name: 'AI Model Deployment', difficulty: 'Advanced' },
                    { skillId: 'docker',    name: 'Docker & Containers',  difficulty: 'Intermediate' },
                    { skillId: 'ci-cd',     name: 'CI/CD Pipelines',      difficulty: 'Intermediate' },
                    { skillId: 'git',       name: 'Git & GitHub',         difficulty: 'Beginner' },
                ],
            },
        ],
    },

    // ─────────────────────────────────────────────────────
    // Data Engineer
    // ─────────────────────────────────────────────────────
    {
        career: 'data-engineer',
        title: 'Data Engineer',
        totalSkills: 10,
        stages: [
            {
                stage: 1,
                title: 'Core Languages',
                description: 'Build the programming foundation for working with data at scale.',
                skills: [
                    { skillId: 'python-basics', name: 'Python Programming', difficulty: 'Beginner' },
                    { skillId: 'sql',           name: 'SQL & Relational Databases', difficulty: 'Beginner' },
                ],
            },
            {
                stage: 2,
                title: 'Data Architecture',
                description: 'Design robust data storage and retrieval systems.',
                skills: [
                    { skillId: 'mongodb',        name: 'MongoDB',         difficulty: 'Intermediate' },
                    { skillId: 'data-warehousing', name: 'Data Warehousing', difficulty: 'Intermediate' },
                    { skillId: 'numpy-pandas',   name: 'Pandas & NumPy',  difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 3,
                title: 'Big Data & Pipelines',
                description: 'Process and move large datasets efficiently.',
                skills: [
                    { skillId: 'data-pipelines', name: 'Data Pipelines & ETL',   difficulty: 'Intermediate' },
                    { skillId: 'big-data',       name: 'Big Data (Spark/Kafka)',  difficulty: 'Advanced' },
                ],
            },
            {
                stage: 4,
                title: 'Infrastructure & DevOps',
                description: 'Automate and manage data infrastructure.',
                skills: [
                    { skillId: 'docker', name: 'Docker & Containers', difficulty: 'Intermediate' },
                    { skillId: 'ci-cd',  name: 'CI/CD Pipelines',     difficulty: 'Intermediate' },
                    { skillId: 'git',    name: 'Git & GitHub',         difficulty: 'Beginner' },
                ],
            },
        ],
    },

    // ─────────────────────────────────────────────────────
    // Cloud Engineer
    // ─────────────────────────────────────────────────────
    {
        career: 'cloud-engineer',
        title: 'Cloud Engineer',
        totalSkills: 10,
        stages: [
            {
                stage: 1,
                title: 'Foundations',
                description: 'Get comfortable with programming, Linux, and version control.',
                skills: [
                    { skillId: 'linux-basics', name: 'Linux Basics', difficulty: 'Beginner' },
                    { skillId: 'git',          name: 'Git & GitHub', difficulty: 'Beginner' },
                    { skillId: 'node-basics',  name: 'Node.js',      difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 2,
                title: 'Cloud Providers',
                description: 'Learn core services from major cloud platforms.',
                skills: [
                    { skillId: 'cloud-providers', name: 'Cloud Providers (AWS/GCP/Azure)', difficulty: 'Intermediate' },
                    { skillId: 'cloud-security',  name: 'Cloud Security',                  difficulty: 'Advanced' },
                ],
            },
            {
                stage: 3,
                title: 'Containers & IaC',
                description: 'Automate infrastructure using containers and Terraform.',
                skills: [
                    { skillId: 'docker',               name: 'Docker & Containers',       difficulty: 'Intermediate' },
                    { skillId: 'kubernetes',           name: 'Kubernetes',                difficulty: 'Advanced' },
                    { skillId: 'infrastructure-as-code', name: 'Infrastructure as Code (Terraform)', difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 4,
                title: 'CI/CD & Monitoring',
                description: 'Ship and monitor cloud workloads reliably.',
                skills: [
                    { skillId: 'ci-cd',      name: 'CI/CD Pipelines',          difficulty: 'Intermediate' },
                    { skillId: 'monitoring', name: 'Monitoring & Observability', difficulty: 'Intermediate' },
                ],
            },
        ],
    },

    // ─────────────────────────────────────────────────────
    // DevOps Engineer
    // ─────────────────────────────────────────────────────
    {
        career: 'devops',
        title: 'DevOps Engineer',
        totalSkills: 12,
        stages: [
            {
                stage: 1,
                title: 'Core Tools',
                description: 'Master version control and scripting fundamentals.',
                skills: [
                    { skillId: 'git',         name: 'Git & GitHub', difficulty: 'Beginner' },
                    { skillId: 'linux-basics', name: 'Linux Basics', difficulty: 'Beginner' },
                    { skillId: 'node-basics', name: 'Node.js',       difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 2,
                title: 'Containers & Orchestration',
                description: 'Package and run workloads with Docker and Kubernetes.',
                skills: [
                    { skillId: 'docker',     name: 'Docker & Containers', difficulty: 'Intermediate' },
                    { skillId: 'kubernetes', name: 'Kubernetes',           difficulty: 'Advanced' },
                ],
            },
            {
                stage: 3,
                title: 'Automation & IaC',
                description: 'Automate everything — pipelines, infrastructure, and deployments.',
                skills: [
                    { skillId: 'ci-cd',                name: 'CI/CD Pipelines',               difficulty: 'Intermediate' },
                    { skillId: 'infrastructure-as-code', name: 'Infrastructure as Code (Terraform)', difficulty: 'Intermediate' },
                    { skillId: 'rest-api',             name: 'REST API Design',               difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 4,
                title: 'Cloud & Monitoring',
                description: 'Deploy to cloud providers and monitor your systems.',
                skills: [
                    { skillId: 'cloud-providers', name: 'Cloud Providers (AWS/GCP/Azure)', difficulty: 'Intermediate' },
                    { skillId: 'monitoring',      name: 'Monitoring & Observability',      difficulty: 'Intermediate' },
                    { skillId: 'deploy-fe',       name: 'Deployment',                      difficulty: 'Beginner' },
                    { skillId: 'auth-jwt',        name: 'Authentication & JWT',            difficulty: 'Intermediate' },
                ],
            },
        ],
    },

    // ─────────────────────────────────────────────────────
    // AI Product Engineer
    // ─────────────────────────────────────────────────────
    {
        career: 'ai-product',
        title: 'AI Product Engineer',
        totalSkills: 11,
        stages: [
            {
                stage: 1,
                title: 'LLMs & Prompting',
                description: 'Understand and use the latest AI models effectively.',
                skills: [
                    { skillId: 'llm',       name: 'Large Language Models', difficulty: 'Advanced' },
                    { skillId: 'prompting', name: 'Prompt Engineering',    difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 2,
                title: 'APIs & Data',
                description: 'Connect AI capabilities to real data and APIs.',
                skills: [
                    { skillId: 'rest-api',  name: 'REST API Design', difficulty: 'Intermediate' },
                    { skillId: 'mongodb',   name: 'MongoDB',         difficulty: 'Intermediate' },
                    { skillId: 'auth-jwt',  name: 'Authentication & JWT', difficulty: 'Intermediate' },
                ],
            },
            {
                stage: 3,
                title: 'Application Building',
                description: 'Build and ship full AI-powered products.',
                skills: [
                    { skillId: 'react-basics', name: 'React Basics & JSX', difficulty: 'Intermediate' },
                    { skillId: 'node-basics',  name: 'Node.js',            difficulty: 'Intermediate' },
                    { skillId: 'tailwind',     name: 'Tailwind CSS',       difficulty: 'Beginner' },
                ],
            },
            {
                stage: 4,
                title: 'Deployment & Scaling',
                description: 'Deploy and maintain your AI products in production.',
                skills: [
                    { skillId: 'deploy-ai', name: 'AI Model Deployment', difficulty: 'Advanced' },
                    { skillId: 'docker',    name: 'Docker & Containers',  difficulty: 'Intermediate' },
                    { skillId: 'git',       name: 'Git & GitHub',         difficulty: 'Beginner' },
                ],
            },
        ],
    },
];

// ─── Seed Function ────────────────────────────────────────────────────────────
async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Skill.deleteMany({});
        await Roadmap.deleteMany({});
        console.log('🗑️  Cleared existing seeds');

        // Insert skills
        const inserted = await Skill.insertMany(SKILLS);
        console.log(`✅ Seeded ${inserted.length} skills`);

        // Insert roadmaps
        const roads = await Roadmap.insertMany(ROADMAPS);
        console.log(`✅ Seeded ${roads.length} roadmaps`);

        await mongoose.disconnect();
        console.log('✅ Seeding complete');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed failed:', err);
        process.exit(1);
    }
}

seed();
