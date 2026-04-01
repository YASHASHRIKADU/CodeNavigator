/**
 * Resources Data
 *
 * Keys must match the career IDs defined in careerController.js:
 *   frontend, backend, fullstack, datascience, ai-engineer, data-engineer,
 *   cybersecurity, cloud-engineer, devops, ai-product
 *
 * Roadmap generation also stores long slugs like
 *   "web-development-frontend-developer-beginner"
 * The resourceController does prefix/keyword matching to handle those.
 */

const resourcesData = [
    // ─── Frontend ─────────────────────────────────────────────────────────────
    {
        career: "frontend",
        category: "HTML & CSS",
        items: [
            { title: 'MDN Web Docs — HTML', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', free: true },
            { title: 'CSS-Tricks', type: 'tutorial', url: 'https://css-tricks.com', free: true },
            { title: 'Flexbox Froggy', type: 'practice', url: 'https://flexboxfroggy.com', free: true },
            { title: 'freeCodeCamp Responsive Web Design', type: 'tutorial', url: 'https://www.freecodecamp.org/learn/responsive-web-design/', free: true }
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
        category: "React & Frameworks",
        items: [
            { title: 'React Official Documentation', type: 'docs', url: 'https://react.dev', free: true },
            { title: 'Next.js Documentation', type: 'docs', url: 'https://nextjs.org/docs', free: true },
            { title: 'React Tutorial — Traversy Media', type: 'video', url: 'https://www.youtube.com/watch?v=LDB4uaJ87e0', free: true }
        ]
    },

    // ─── Backend ──────────────────────────────────────────────────────────────
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
            { title: 'PostgreSQL Tutorial', type: 'tutorial', url: 'https://www.postgresqltutorial.com', free: true },
            { title: 'Redis Crash Course', type: 'video', url: 'https://www.youtube.com/watch?v=jgpVdJB2sKQ', free: true }
        ]
    },
    {
        career: "backend",
        category: "API Security & Auth",
        items: [
            { title: 'JWT Introduction', type: 'docs', url: 'https://jwt.io/introduction', free: true },
            { title: 'OWASP API Security Top 10', type: 'docs', url: 'https://owasp.org/www-project-api-security/', free: true }
        ]
    },

    // ─── Full Stack ───────────────────────────────────────────────────────────
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
        career: "fullstack",
        category: "Deployment & DevOps Basics",
        items: [
            { title: 'Docker 101', type: 'docs', url: 'https://docs.docker.com/get-started/', free: true },
            { title: 'GitHub Actions Guide', type: 'docs', url: 'https://docs.github.com/en/actions', free: true },
            { title: 'Vercel Deployment', type: 'docs', url: 'https://vercel.com/docs', free: true }
        ]
    },

    // ─── Data Science (career ID: datascience) ────────────────────────────────
    {
        career: "datascience",
        category: "Python & Data Science",
        items: [
            { title: 'Python.org Documentation', type: 'docs', url: 'https://docs.python.org/3/', free: true },
            { title: 'Kaggle — Free Courses', type: 'tutorial', url: 'https://www.kaggle.com/learn', free: true },
            { title: 'Python Data Science Handbook', type: 'docs', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/', free: true }
        ]
    },
    {
        career: "datascience",
        category: "Machine Learning & Modeling",
        items: [
            { title: 'Scikit-Learn User Guide', type: 'docs', url: 'https://scikit-learn.org/stable/user_guide.html', free: true },
            { title: 'fast.ai — Practical Deep Learning', type: 'video', url: 'https://course.fast.ai', free: true },
            { title: 'StatQuest with Josh Starmer', type: 'video', url: 'https://www.youtube.com/user/joshstarmer', free: true }
        ]
    },
    {
        career: "datascience",
        category: "Data Visualization & Analysis",
        items: [
            { title: 'Matplotlib Documentation', type: 'docs', url: 'https://matplotlib.org/stable/contents.html', free: true },
            { title: 'Seaborn Tutorial', type: 'tutorial', url: 'https://seaborn.pydata.org/tutorial.html', free: true },
            { title: 'SQLBolt — Interactive SQL', type: 'practice', url: 'https://sqlbolt.com/', free: true }
        ]
    },

    // ─── AI Engineer (career ID: ai-engineer) ─────────────────────────────────
    {
        career: "ai-engineer",
        category: "AI & Machine Learning",
        items: [
            { title: 'Machine Learning by Andrew Ng (Coursera)', type: 'video', url: 'https://www.coursera.org/learn/machine-learning', free: true },
            { title: 'Hugging Face NLP Course', type: 'tutorial', url: 'https://huggingface.co/learn/nlp-course', free: true },
            { title: 'DeepLearning.AI', type: 'docs', url: 'https://www.deeplearning.ai/', free: true }
        ]
    },
    {
        career: "ai-engineer",
        category: "LLMs & AI APIs",
        items: [
            { title: 'OpenAI API Reference', type: 'docs', url: 'https://platform.openai.com/docs/api-reference', free: true },
            { title: 'LangChain Documentation', type: 'docs', url: 'https://python.langchain.com/docs/get_started/introduction', free: true },
            { title: 'Prompt Engineering Guide', type: 'tutorial', url: 'https://www.promptingguide.ai/', free: true }
        ]
    },
    {
        career: "ai-engineer",
        category: "RAG & Vector Databases",
        items: [
            { title: 'Pinecone Docs', type: 'docs', url: 'https://docs.pinecone.io/', free: true },
            { title: 'RAG Explanation — PromptingGuide', type: 'tutorial', url: 'https://www.promptingguide.ai/techniques/rag', free: true },
            { title: 'Hugging Face Inference Endpoints', type: 'docs', url: 'https://huggingface.co/docs/inference-endpoints/index', free: true }
        ]
    },

    // ─── AI Product Engineer (career ID: ai-product) ──────────────────────────
    {
        career: "ai-product",
        category: "Building AI Products",
        items: [
            { title: 'LangChain Documentation', type: 'docs', url: 'https://python.langchain.com/docs/get_started/introduction', free: true },
            { title: 'Prompt Engineering Guide', type: 'tutorial', url: 'https://www.promptingguide.ai/', free: true },
            { title: 'LangGraph Concepts', type: 'tutorial', url: 'https://python.langchain.com/docs/langgraph', free: true }
        ]
    },
    {
        career: "ai-product",
        category: "Vector Databases & RAG",
        items: [
            { title: 'Pinecone Docs', type: 'docs', url: 'https://docs.pinecone.io/', free: true },
            { title: 'Weaviate Docs', type: 'docs', url: 'https://weaviate.io/developers/weaviate', free: true },
            { title: 'RAG Explanation', type: 'tutorial', url: 'https://www.promptingguide.ai/techniques/rag', free: true }
        ]
    },

    // ─── Data Engineer (career ID: data-engineer) ─────────────────────────────
    {
        career: "data-engineer",
        category: "Data Pipelines & ETL",
        items: [
            { title: 'Apache Spark Documentation', type: 'docs', url: 'https://spark.apache.org/docs/latest/', free: true },
            { title: 'Apache Airflow Tutorial', type: 'docs', url: 'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html', free: true },
            { title: 'dbt Documentation', type: 'docs', url: 'https://docs.getdbt.com/', free: true }
        ]
    },
    {
        career: "data-engineer",
        category: "Data Warehousing & SQL",
        items: [
            { title: 'PostgreSQL Tutorial', type: 'tutorial', url: 'https://www.postgresqltutorial.com', free: true },
            { title: 'Snowflake Getting Started', type: 'docs', url: 'https://docs.snowflake.com/en/user-guide-getting-started', free: true },
            { title: 'SQLBolt — Interactive SQL', type: 'practice', url: 'https://sqlbolt.com/', free: true }
        ]
    },
    {
        career: "data-engineer",
        category: "Streaming & Kafka",
        items: [
            { title: 'Apache Kafka Quickstart', type: 'docs', url: 'https://kafka.apache.org/quickstart', free: true },
            { title: 'Confluent Kafka Tutorials', type: 'tutorial', url: 'https://developer.confluent.io/tutorials/', free: true }
        ]
    },

    // ─── DevOps (career ID: devops) ───────────────────────────────────────────
    {
        career: "devops",
        category: "DevOps & CI/CD",
        items: [
            { title: 'DevOps Roadmap', type: 'docs', url: 'https://roadmap.sh/devops', free: true },
            { title: 'GitHub Actions Guide', type: 'docs', url: 'https://docs.github.com/en/actions', free: true },
            { title: 'Jenkins Pipeline Tutorial', type: 'tutorial', url: 'https://www.jenkins.io/doc/book/pipeline/', free: true }
        ]
    },
    {
        career: "devops",
        category: "Containers & Orchestration",
        items: [
            { title: 'Docker Documentation', type: 'docs', url: 'https://docs.docker.com/', free: true },
            { title: 'Kubernetes Basics', type: 'tutorial', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', free: true },
            { title: 'Helm Quickstart', type: 'docs', url: 'https://helm.sh/docs/intro/quickstart/', free: true }
        ]
    },
    {
        career: "devops",
        category: "Infrastructure as Code",
        items: [
            { title: 'HashiCorp Terraform Tutorials', type: 'tutorial', url: 'https://developer.hashicorp.com/terraform/tutorials', free: true },
            { title: 'Ansible Getting Started', type: 'docs', url: 'https://docs.ansible.com/ansible/latest/getting_started/index.html', free: true }
        ]
    },

    // ─── Cloud Engineer (career ID: cloud-engineer) ───────────────────────────
    {
        career: "cloud-engineer",
        category: "Cloud Computing & Architecture",
        items: [
            { title: 'AWS Skill Builder', type: 'tutorial', url: 'https://explore.skillbuilder.aws/', free: true },
            { title: 'Google Cloud Training', type: 'video', url: 'https://cloud.google.com/training', free: true },
            { title: 'Microsoft Learn for Azure', type: 'docs', url: 'https://learn.microsoft.com/en-us/training/azure/', free: true }
        ]
    },
    {
        career: "cloud-engineer",
        category: "Core Cloud Services",
        items: [
            { title: 'AWS EC2 Getting Started', type: 'docs', url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html', free: true },
            { title: 'AWS S3 Core Concepts', type: 'docs', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html', free: true },
            { title: 'AWS IAM Best Practices', type: 'docs', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html', free: true }
        ]
    },
    {
        career: "cloud-engineer",
        category: "Infrastructure Automation",
        items: [
            { title: 'Terraform Learn', type: 'tutorial', url: 'https://developer.hashicorp.com/terraform/tutorials', free: true },
            { title: 'AWS Lambda Intro', type: 'docs', url: 'https://docs.aws.amazon.com/lambda/latest/dg/welcome.html', free: true }
        ]
    },

    // ─── Cybersecurity (career ID: cybersecurity) ─────────────────────────────
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
        career: "cybersecurity",
        category: "Ethical Hacking & Pentesting",
        items: [
            { title: 'Kali Linux Documentation', type: 'docs', url: 'https://www.kali.org/docs/', free: true },
            { title: 'Metasploit Unleashed', type: 'tutorial', url: 'https://www.offensive-security.com/metasploit-unleashed/', free: true },
            { title: 'PortSwigger Web Security Academy', type: 'practice', url: 'https://portswigger.net/web-security', free: true }
        ]
    },
    {
        career: "cybersecurity",
        category: "Network Security",
        items: [
            { title: 'MITRE ATT&CK Framework', type: 'docs', url: 'https://attack.mitre.org/', free: true },
            { title: 'Wireshark Documentation', type: 'docs', url: 'https://www.wireshark.org/docs/', free: true },
            { title: 'CompTIA Security+ Study Guide', type: 'tutorial', url: 'https://www.professormesser.com/security-plus/sy0-601/sy0-601-video/sy0-601-training-course/', free: true }
        ]
    },

    // ─── Mobile Development (for completeness) ────────────────────────────────
    {
        career: "mobile-development",
        category: "Mobile App Essentials",
        items: [
            { title: 'React Native Documentation', type: 'docs', url: 'https://reactnative.dev/docs/getting-started', free: true },
            { title: 'Android Developer Basics', type: 'tutorial', url: 'https://developer.android.com/courses', free: true },
            { title: 'iOS App Dev Tutorials', type: 'practice', url: 'https://developer.apple.com/tutorials/app-dev-training', free: true }
        ]
    },

    // ─── Game Development (for completeness) ─────────────────────────────────
    {
        career: "game-development",
        category: "Game Design & Engines",
        items: [
            { title: 'Unity Learn', type: 'tutorial', url: 'https://learn.unity.com/', free: true },
            { title: 'Unreal Engine Documentation', type: 'docs', url: 'https://docs.unrealengine.com/', free: true },
            { title: 'Godot Engine Docs', type: 'docs', url: 'https://docs.godotengine.org/', free: true }
        ]
    },
];

module.exports = resourcesData;
