const Roadmap = require('../models/Roadmap');
const Skill = require('../models/Skill');
const User = require('../models/User');

// ─── Curated skill map per career path with specific resources ──────────────────
const CAREER_SKILL_MAP = {
    // Web Development
    'Frontend Developer': [
        { 
            stage: 'Web Foundations', 
            skills: [
                { name: 'HTML', resources: [{ title: 'MDN HTML Docs', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' }, { title: 'W3Schools HTML', type: 'tutorial', url: 'https://www.w3schools.com/html/' }] },
                { name: 'CSS', resources: [{ title: 'MDN CSS Docs', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' }, { title: 'freeCodeCamp CSS Course', type: 'tutorial', url: 'https://www.freecodecamp.org/learn/responsive-web-design/' }] },
                { name: 'Responsive Design', resources: [{ title: 'CSS Flexbox Guide', type: 'article', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }, { title: 'CSS Grid Guide', type: 'article', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' }] }
            ] 
        },
        { 
            stage: 'JavaScript Core', 
            skills: [
                { name: 'JavaScript Basics', resources: [{ title: 'MDN JS Guide', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' }, { title: 'JavaScript.info', type: 'tutorial', url: 'https://javascript.info/' }] },
                { name: 'DOM Manipulation', resources: [{ title: 'MDN DOM API', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction' }] },
                { name: 'ES6 Concepts', resources: [{ title: 'ES6 Syntax Guide', type: 'article', url: 'https://www.freecodecamp.org/news/write-less-do-more-with-es6-5fd4a8e50ee2/' }] }
            ] 
        },
        { 
            stage: 'Frameworks', 
            skills: [
                { name: 'React', resources: [{ title: 'React Official Docs', type: 'docs', url: 'https://react.dev/' }, { title: 'freeCodeCamp React Course', type: 'tutorial', url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/' }] },
                { name: 'Next.js', resources: [{ title: 'Next.js Docs', type: 'docs', url: 'https://nextjs.org/docs' }] }
            ] 
        },
        { 
            stage: 'Advanced Topics', 
            skills: [
                { name: 'Performance Optimization', resources: [{ title: 'Web Vitals', type: 'docs', url: 'https://web.dev/vitals/' }] },
                { name: 'Testing', resources: [{ title: 'Jest Docs', type: 'docs', url: 'https://jestjs.io/docs/getting-started' }, { title: 'Testing Library', type: 'docs', url: 'https://testing-library.com/' }] },
                { name: 'Deployment', resources: [{ title: 'Vercel Deployment', type: 'docs', url: 'https://vercel.com/docs' }] }
            ] 
        },
    ],
    'Backend Developer': [
        { 
            stage: 'Server Basics', 
            skills: [
                { name: 'Node.js', resources: [{ title: 'Node.js Docs', type: 'docs', url: 'https://nodejs.org/en/docs/' }, { title: 'Node Crash Course', type: 'video', url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4' }] },
                { name: 'Express.js', resources: [{ title: 'Express Routing', type: 'docs', url: 'https://expressjs.com/en/guide/routing.html' }] },
                { name: 'REST APIs', resources: [{ title: 'REST API Best Practices', type: 'article', url: 'https://restfulapi.net/' }] }
            ] 
        },
        { 
            stage: 'Data Layer', 
            skills: [
                { name: 'MongoDB', resources: [{ title: 'MongoDB Manual', type: 'docs', url: 'https://www.mongodb.com/docs/manual/' }, { title: 'Mongoose Docs', type: 'docs', url: 'https://mongoosejs.com/docs/' }] },
                { name: 'SQL Basics', resources: [{ title: 'PostgreSQL Tutorial', type: 'tutorial', url: 'https://www.postgresqltutorial.com/' }] },
                { name: 'Authentication (JWT)', resources: [{ title: 'JWT Intro', type: 'article', url: 'https://jwt.io/introduction' }] }
            ] 
        },
        { 
            stage: 'Architecture & Scaling',  
            skills: [
                { name: 'Caching (Redis)', resources: [{ title: 'Redis Crash Course', type: 'video', url: 'https://www.youtube.com/watch?v=jgpVdJB2sKQ' }] },
                { name: 'Message Queues', resources: [{ title: 'RabbitMQ Tutorial', type: 'tutorial', url: 'https://www.rabbitmq.com/getstarted.html' }] },
                { name: 'API Security', resources: [{ title: 'OWASP Top 10 API Security', type: 'article', url: 'https://owasp.org/www-project-api-security/' }] }
            ] 
        },
    ],
    'Full Stack Developer': [
        { stage: 'Web Foundations', skills: [{ name: 'HTML & CSS', resources: [{ title: 'freeCodeCamp RWD', type: 'tutorial', url: 'https://www.freecodecamp.org/learn/responsive-web-design/' }] }, { name: 'JavaScript Core', resources: [{ title: 'MDN JS Guide', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' }] }] },
        { stage: 'Frontend Stack', skills: [{ name: 'React', resources: [{ title: 'React Docs', type: 'docs', url: 'https://react.dev/' }] }, { name: 'State Management', resources: [{ title: 'Redux Toolkit', type: 'docs', url: 'https://redux-toolkit.js.org/' }] }] },
        { stage: 'Backend Stack', skills: [{ name: 'Node.js & Express', resources: [{ title: 'Express Routing', type: 'docs', url: 'https://expressjs.com/en/guide/routing.html' }] }, { name: 'Databases (SQL/NoSQL)', resources: [{ title: 'MongoDB Basics', type: 'docs', url: 'https://www.mongodb.com/docs/manual/' }] }] },
        { stage: 'Deployment', skills: [{ name: 'Docker', resources: [{ title: 'Docker 101', type: 'article', url: 'https://docs.docker.com/get-started/' }] }, { name: 'CI/CD Pipelines', resources: [{ title: 'GitHub Actions Guide', type: 'docs', url: 'https://docs.github.com/en/actions' }] }] },
    ],
    // AI
    'Machine Learning Engineer': [
        { stage: 'Math & Python', skills: [{ name: 'Python for ML', resources: [{ title: 'Kaggle Python Course', type: 'tutorial', url: 'https://www.kaggle.com/learn/python' }] }, { name: 'Statistics & Linear Algebra', resources: [{ title: 'Khan Academy Linear Algebra', type: 'video', url: 'https://www.khanacademy.org/math/linear-algebra' }] }] },
        { stage: 'Data Processing', skills: [{ name: 'Pandas', resources: [{ title: 'Pandas Docs', type: 'docs', url: 'https://pandas.pydata.org/docs/' }] }, { name: 'NumPy', resources: [{ title: 'NumPy Quickstart', type: 'docs', url: 'https://numpy.org/doc/stable/user/quickstart.html' }] }] },
        { stage: 'Core ML Models', skills: [{ name: 'Scikit-Learn', resources: [{ title: 'Scikit-Learn Tutorials', type: 'tutorial', url: 'https://scikit-learn.org/stable/tutorial/index.html' }] }, { name: 'Feature Engineering', resources: [{ title: 'Kaggle Feature Engineering', type: 'tutorial', url: 'https://www.kaggle.com/learn/feature-engineering' }] }] },
        { stage: 'Deep Learning', skills: [{ name: 'TensorFlow / PyTorch', resources: [{ title: 'PyTorch Tutorials', type: 'docs', url: 'https://pytorch.org/tutorials/' }] }, { name: 'Neural Networks', resources: [{ title: 'Neural Networks by 3Blue1Brown', type: 'video', url: 'https://www.youtube.com/watch?v=aircAruvnKk' }] }] },
    ],
    'AI Engineer': [
        { stage: 'Foundations', skills: [{ name: 'Python', resources: [{ title: 'Python.org', type: 'docs', url: 'https://docs.python.org/3/' }] }, { name: 'APIs & Integration', resources: [{ title: 'Postman API Learning Center', type: 'docs', url: 'https://learning.postman.com/' }] }] },
        { stage: 'LLM Orchestration', skills: [{ name: 'LangChain', resources: [{ title: 'LangChain Docs', type: 'docs', url: 'https://python.langchain.com/docs/get_started/introduction' }] }, { name: 'OpenAI/Gemini APIs', resources: [{ title: 'OpenAI API Reference', type: 'docs', url: 'https://platform.openai.com/docs/api-reference' }] }] },
        { stage: 'Information Retrieval', skills: [{ name: 'Vector Databases', resources: [{ title: 'Pinecone Docs', type: 'docs', url: 'https://docs.pinecone.io/' }] }, { name: 'RAG Systems', resources: [{ title: 'RAG Explanation', type: 'article', url: 'https://www.promptingguide.ai/techniques/rag' }] }] },
        { stage: 'Productionizing AI', skills: [{ name: 'AI Agents', resources: [{ title: 'LangGraph Concepts', type: 'article', url: 'https://python.langchain.com/docs/langgraph' }] }, { name: 'Model Deployment', resources: [{ title: 'Hugging Face Inference', type: 'docs', url: 'https://huggingface.co/docs/inference-endpoints/index' }] }] },
    ],
    'Prompt Engineer': [
        { stage: 'LLM Basics', skills: [{ name: 'How LLMs Work', resources: [{ title: 'Understanding LLMs', type: 'article', url: 'https://www.anthropic.com/index/core-views-on-ai-safety' }] }] },
        { stage: 'Prompt Design', skills: [{ name: 'Prompt Patterns', resources: [{ title: 'Prompt Engineering Guide', type: 'tutorial', url: 'https://www.promptingguide.ai/' }] }, { name: 'Chain-of-Thought', resources: [{ title: 'Chain of Thought Prompting', type: 'article', url: 'https://www.promptingguide.ai/techniques/cot' }] }] },
        { stage: 'System Design', skills: [{ name: 'System Prompts', resources: [{ title: 'OpenAI System Prompts', type: 'docs', url: 'https://platform.openai.com/docs/guides/text-generation' }] }, { name: 'Few-shot Learning', resources: [{ title: 'Few-Shot Prompting', type: 'article', url: 'https://www.promptingguide.ai/techniques/fewshot' }] }] },
    ],
    // Cloud
    'Cloud Engineer': [
        { stage: 'Infrastructure Foundations', skills: [{ name: 'Linux Basics', resources: [{ title: 'Linux Journey', type: 'tutorial', url: 'https://linuxjourney.com/' }] }, { name: 'Networking Concepts', resources: [{ title: 'Cloud Networking Basics', type: 'article', url: 'https://aws.amazon.com/what-is/networking/' }] }] },
        { stage: 'Core Cloud Services', skills: [{ name: 'Compute (EC2/VMs)', resources: [{ title: 'AWS EC2 Getting Started', type: 'docs', url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html' }] }, { name: 'Storage (S3)', resources: [{ title: 'AWS S3 Core Concepts', type: 'docs', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html' }] }, { name: 'IAM', resources: [{ title: 'AWS IAM Best Practices', type: 'docs', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' }] }] },
        { stage: 'Automation', skills: [{ name: 'Terraform Basics', resources: [{ title: 'HashiCorp Terraform Tutorials', type: 'tutorial', url: 'https://developer.hashicorp.com/terraform/tutorials' }] }, { name: 'Serverless Functions', resources: [{ title: 'AWS Lambda Intro', type: 'docs', url: 'https://docs.aws.amazon.com/lambda/latest/dg/welcome.html' }] }] },
    ],
    'Cloud Architect': [
        { stage: 'Design Principles', skills: [{ name: 'Well-Architected Framework', resources: [{ title: 'AWS Well-Architected', type: 'docs', url: 'https://aws.amazon.com/architecture/well-architected/' }] }] },
        { stage: 'System Design', skills: [{ name: 'High Availability', resources: [{ title: 'HA Architecture Design', type: 'article', url: 'https://docs.aws.amazon.com/whitepapers/latest/real-time-communication-on-aws/high-availability-and-scalability.html' }] }, { name: 'Cost Optimization', resources: [{ title: 'FinOps Fundamentals', type: 'article', url: 'https://www.finops.org/introduction/what-is-finops/' }] }] },
        { stage: 'Advanced Strategy', skills: [{ name: 'Multi-Cloud Deployments', resources: [{ title: 'Multi-Cloud Strategy Guide', type: 'article', url: 'https://cloud.google.com/learn/what-is-multicloud' }] }, { name: 'Disaster Recovery', resources: [{ title: 'DR on AWS', type: 'docs', url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-of-workloads-on-aws/disaster-recovery-of-workloads-on-aws.html' }] }] },
    ],
    'Site Reliability Engineer': [
        { stage: 'SRE Fundamentals', skills: [{ name: 'Linux & Scripting', resources: [{ title: 'Bash Scripting Guide', type: 'tutorial', url: 'https://tldp.org/LDP/abs/html/' }] }, { name: 'SLIs, SLOs & SLAs', resources: [{ title: 'Google SRE Book - SLOs', type: 'docs', url: 'https://sre.google/sre-book/service-level-objectives/' }] }] },
        { stage: 'Incident & Observation', skills: [{ name: 'Monitoring (Prometheus/Grafana)', resources: [{ title: 'Prometheus Getting Started', type: 'docs', url: 'https://prometheus.io/docs/prometheus/latest/getting_started/' }] }, { name: 'Incident Management', resources: [{ title: 'PagerDuty Incident Response', type: 'docs', url: 'https://response.pagerduty.com/' }] }] },
        { stage: 'Resilience', skills: [{ name: 'Chaos Engineering', resources: [{ title: 'Principles of Chaos', type: 'article', url: 'https://principlesofchaos.org/' }] }, { name: 'Kubernetes Debugging', resources: [{ title: 'Troubleshooting K8s', type: 'docs', url: 'https://kubernetes.io/docs/tasks/debug/' }] }] },
    ],
    // Cybersecurity
    'Security Analyst': [
        { stage: 'Sec Foundations', skills: [{ name: 'Networking & Protocols', resources: [{ title: 'TCP/IP Model', type: 'article', url: 'https://www.geeksforgeeks.org/tcp-ip-model/' }] }, { name: 'Core Security Concepts', resources: [{ title: 'CompTIA Security+ Prep', type: 'tutorial', url: 'https://www.professormesser.com/security-plus/sy0-601/sy0-601-video/sy0-601-training-course/' }] }] },
        { stage: 'Defensive Operations', skills: [{ name: 'SIEM Tools', resources: [{ title: 'Splunk Fundamentals', type: 'course', url: 'https://www.splunk.com/en_us/training.html' }] }, { name: 'Threat Detection', resources: [{ title: 'MITRE ATT&CK Framework', type: 'docs', url: 'https://attack.mitre.org/' }] }] },
        { stage: 'Response', skills: [{ name: 'Vulnerability Assessment', resources: [{ title: 'Nessus Essentials', type: 'tutorial', url: 'https://www.tenable.com/products/nessus/nessus-essentials' }] }, { name: 'Digital Forensics', resources: [{ title: 'Forensics Basics', type: 'article', url: 'https://www.sans.org/digital-forensics-incident-response/' }] }] },
    ],
    'Penetration Tester': [
        { stage: 'Attacker Toolkit', skills: [{ name: 'Kali Linux', resources: [{ title: 'Kali Docs', type: 'docs', url: 'https://www.kali.org/docs/' }] }, { name: 'Nmap & Recon', resources: [{ title: 'Nmap Cheat Sheet', type: 'article', url: 'https://highon.coffee/blog/nmap-cheat-sheet/' }] }] },
        { stage: 'Exploitation', skills: [{ name: 'Metasploit', resources: [{ title: 'Metasploit Unleashed', type: 'tutorial', url: 'https://www.offensive-security.com/metasploit-unleashed/' }] }, { name: 'Burp Suite', resources: [{ title: 'PortSwigger Web Security Academy', type: 'course', url: 'https://portswigger.net/web-security' }] }] },
        { stage: 'Targets', skills: [{ name: 'Web App Pentesting', resources: [{ title: 'OWASP Top 10', type: 'docs', url: 'https://owasp.org/www-project-top-ten/' }] }, { name: 'Active Directory Attacks', resources: [{ title: 'AD Pentest Guide', type: 'article', url: 'https://book.hacktricks.xyz/windows-hardening/active-directory-methodology' }] }] },
    ],
    'Security Engineer': [
        { stage: 'Infrastructure Security', skills: [{ name: 'Firewalls & IDS/IPS', resources: [{ title: 'Suricata IDS', type: 'docs', url: 'https://suricata.io/' }] }, { name: 'PKI & Cryptography', resources: [{ title: 'Cryptography Crash Course', type: 'video', url: 'https://www.youtube.com/watch?v=jhXCTbFnK8o' }] }] },
        { stage: 'Secure Development', skills: [{ name: 'Secure Code Review', resources: [{ title: 'OWASP Code Review Guide', type: 'docs', url: 'https://owasp.org/www-project-code-review-guide/' }] }, { name: 'DevSecOps', resources: [{ title: 'GitLab DevSecOps', type: 'article', url: 'https://about.gitlab.com/topics/devsecops/' }] }] },
        { stage: 'Advanced Architecture', skills: [{ name: 'Zero Trust Architecture', resources: [{ title: 'NIST Zero Trust', type: 'docs', url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf' }] }, { name: 'Cloud Security Posture', resources: [{ title: 'AWS Security Best Practices', type: 'docs', url: 'https://aws.amazon.com/architecture/security-identity-compliance/' }] }] },
    ],
    // Data Science
    'Data Analyst': [
        { stage: 'Data Basics', skills: [{ name: 'Excel Formulas & Pivots', resources: [{ title: 'Excel Easy', type: 'tutorial', url: 'https://www.excel-easy.com/' }] }, { name: 'SQL Querying', resources: [{ title: 'SQLBolt', type: 'tutorial', url: 'https://sqlbolt.com/' }] }] },
        { stage: 'Programming & Visualization', skills: [{ name: 'Python (Pandas & Math)', resources: [{ title: 'Pandas Tutorials', type: 'docs', url: 'https://pandas.pydata.org/docs/getting_started/tutorials.html' }] }, { name: 'Power BI / Tableau', resources: [{ title: 'Power BI Learning Path', type: 'course', url: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi' }] }] },
        { stage: 'Insights Generation', skills: [{ name: 'A/B Testing Basics', resources: [{ title: 'A/B Testing Guide', type: 'article', url: 'https://vwo.com/ab-testing/' }] }, { name: 'Dashboard Design', resources: [{ title: 'Information Dashboard Design', type: 'book', url: 'https://www.perceptualedge.com/library.php' }] }] },
    ],
    'Data Scientist': [
        { stage: 'Foundations', skills: [{ name: 'Statistics & Probability', resources: [{ title: 'StatQuest', type: 'video', url: 'https://www.youtube.com/user/joshstarmer' }] }, { name: 'Python for Data', resources: [{ title: 'Python Data Science Handbook', type: 'book', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/' }] }] },
        { stage: 'Modeling Tools', skills: [{ name: 'Scikit-Learn', resources: [{ title: 'Scikit-Learn Guide', type: 'docs', url: 'https://scikit-learn.org/stable/user_guide.html' }] }, { name: 'Data Preprocessing', resources: [{ title: 'Feature Scaling & Encoding', type: 'article', url: 'https://towardsdatascience.com/all-about-feature-scaling-bcc0ad75cb35' }] }] },
        { stage: 'Advanced Data Science', skills: [{ name: 'Deep Learning Basics', resources: [{ title: 'DeepLearning.AI', type: 'course', url: 'https://www.deeplearning.ai/' }] }, { name: 'NLP Intro', resources: [{ title: 'Hugging Face NLP Course', type: 'course', url: 'https://huggingface.co/course/chapter1/1' }] }] },
    ],
    // Mobile
    'Android Developer': [
        { stage: 'Android Foundations', skills: [{ name: 'Kotlin Basics', resources: [{ title: 'Kotlin Koans', type: 'practice', url: 'https://play.kotlinlang.org/koans/overview' }] }, { name: 'Android Studio', resources: [{ title: 'Android Developer Guides', type: 'docs', url: 'https://developer.android.com/guide' }] }] },
        { stage: 'UI & Architecture', skills: [{ name: 'Jetpack Compose', resources: [{ title: 'Compose Pathway', type: 'course', url: 'https://developer.android.com/courses/pathways/compose' }] }, { name: 'ViewModel & Room', resources: [{ title: 'Android Architecture Components', type: 'docs', url: 'https://developer.android.com/topic/architecture' }] }] },
        { stage: 'Integration', skills: [{ name: 'REST API & Retrofit', resources: [{ title: 'Retrofit Docs', type: 'docs', url: 'https://square.github.io/retrofit/' }] }, { name: 'Firebase', resources: [{ title: 'Firebase for Android', type: 'docs', url: 'https://firebase.google.com/docs/android/setup' }] }] },
    ],
    'iOS Developer': [
        { stage: 'Apple Ecosystem', skills: [{ name: 'Swift Basics', resources: [{ title: '100 Days of Swift', type: 'tutorial', url: 'https://www.hackingwithswift.com/100' }] }, { name: 'Xcode', resources: [{ title: 'App Development with Swift', type: 'course', url: 'https://developer.apple.com/learn/' }] }] },
        { stage: 'Modern iOS UI', skills: [{ name: 'SwiftUI', resources: [{ title: 'SwiftUI Tutorials', type: 'tutorial', url: 'https://developer.apple.com/tutorials/swiftui' }] }, { name: 'Networking (URLSession)', resources: [{ title: 'URLSession Basics', type: 'article', url: 'https://www.raywenderlich.com/3244963-urlsession-tutorial-getting-started' }] }] },
        { stage: 'Deployment', skills: [{ name: 'CoreData', resources: [{ title: 'CoreData Overview', type: 'docs', url: 'https://developer.apple.com/documentation/coredata' }] }, { name: 'TestFlight & App Store', resources: [{ title: 'App Store Connect Help', type: 'docs', url: 'https://help.apple.com/app-store-connect/' }] }] },
    ],
    'Cross Platform Developer': [
        { stage: 'Flutter Foundations', skills: [{ name: 'Dart Basics', resources: [{ title: 'Dart Tour', type: 'tutorial', url: 'https://dart.dev/guides/language/language-tour' }] }, { name: 'Flutter Widgets', resources: [{ title: 'Flutter Widget Catalog', type: 'docs', url: 'https://docs.flutter.dev/development/ui/widgets' }] }] },
        { stage: 'State & Network', skills: [{ name: 'Provider / Riverpod', resources: [{ title: 'Riverpod Docs', type: 'docs', url: 'https://riverpod.dev/' }] }, { name: 'Networking & JSON', resources: [{ title: 'Fetch Data in Flutter', type: 'tutorial', url: 'https://docs.flutter.dev/cookbook/networking/fetch-data' }] }] },
        { stage: 'Native Integration', skills: [{ name: 'Platform Channels', resources: [{ title: 'Writing Custom Platform-Specific Code', type: 'docs', url: 'https://docs.flutter.dev/development/platform-integration/platform-channels' }] }, { name: 'Firebase in Flutter', resources: [{ title: 'FlutterFire Docs', type: 'docs', url: 'https://firebase.flutter.dev/' }] }] },
    ],
    // Game Development
    'Game Programmer': [
        { stage: 'Core Languages', skills: [{ name: 'C++ for Games', resources: [{ title: 'Learn C++', type: 'tutorial', url: 'https://www.learncpp.com/' }] }, { name: 'Linear Algebra', resources: [{ title: 'Math for Game Devs', type: 'video', url: 'https://www.youtube.com/watch?v=jmWXglNA10Y&list=PLW3Zl3wyJwWOpdhYedlD-yCB7WQoHf-My' }] }] },
        { stage: 'Engine Components', skills: [{ name: 'Physics Engines', resources: [{ title: 'Box2D Docs', type: 'docs', url: 'https://box2d.org/documentation/' }] }, { name: 'Rendering Basics', resources: [{ title: 'LearnOpenGL', type: 'tutorial', url: 'https://learnopengl.com/' }] }] },
        { stage: 'Advanced Gameplay', skills: [{ name: 'Shaders (GLSL)', resources: [{ title: 'The Book of Shaders', type: 'book', url: 'https://thebookofshaders.com/' }] }, { name: 'Game Optimization', resources: [{ title: 'Game Programming Patterns', type: 'book', url: 'https://gameprogrammingpatterns.com/' }] }] },
    ],
    'Unity Developer': [
        { stage: 'Unity Basics', skills: [{ name: 'C# for Unity', resources: [{ title: 'Unity Learn C#', type: 'course', url: 'https://learn.unity.com/pathway/junior-programmer' }] }, { name: 'Unity Editor & Scenes', resources: [{ title: 'Unity Manual', type: 'docs', url: 'https://docs.unity3d.com/Manual/index.html' }] }] },
        { stage: 'Physics & Animation', skills: [{ name: 'Rigidbody Physics', resources: [{ title: 'Physics in Unity', type: 'docs', url: 'https://docs.unity3d.com/Manual/PhysicsSection.html' }] }, { name: 'Animator Component', resources: [{ title: 'Unity Animation System', type: 'docs', url: 'https://docs.unity3d.com/Manual/AnimationSection.html' }] }] },
        { stage: 'Specialization', skills: [{ name: 'Shader Graph', resources: [{ title: 'Shader Graph Basics', type: 'tutorial', url: 'https://learn.unity.com/project/shader-graph-basics' }] }, { name: 'Netcode for GameObjects', resources: [{ title: 'Netcode Docs', type: 'docs', url: 'https://docs-multiplayer.unity3d.com/' }] }] },
    ],
    'Unreal Engine Developer': [
        { stage: 'Unreal Core', skills: [{ name: 'Unreal Editor', resources: [{ title: 'UE5 Getting Started', type: 'docs', url: 'https://docs.unrealengine.com/5.0/en-US/understanding-the-basics-of-unreal-engine/' }] }, { name: 'Blueprints Visual Scripting', resources: [{ title: 'Blueprints Hub', type: 'docs', url: 'https://docs.unrealengine.com/5.0/en-US/blueprints-visual-scripting-in-unreal-engine/' }] }] },
        { stage: 'Custom Logic', skills: [{ name: 'C++ in Unreal', resources: [{ title: 'Programming with C++', type: 'docs', url: 'https://docs.unrealengine.com/5.0/en-US/programming-with-cplusplus-in-unreal-engine/' }] }, { name: 'Materials & Lighting', resources: [{ title: 'Materials Guide', type: 'docs', url: 'https://docs.unrealengine.com/5.0/en-US/materials-in-unreal-engine/' }] }] },
        { stage: 'Next-Gen Features', skills: [{ name: 'Nanite & Lumen', resources: [{ title: 'Lumen Global Illumination', type: 'docs', url: 'https://docs.unrealengine.com/5.0/en-US/lumen-global-illumination-and-reflections-in-unreal-engine/' }] }, { name: 'MetaHuman', resources: [{ title: 'MetaHuman Creator', type: 'docs', url: 'https://docs.metahuman.unrealengine.com/en-US/' }] }] },
    ],
    // DevOps
    'DevOps Engineer': [
        { stage: 'Systems & Source', skills: [{ name: 'Linux Admin', resources: [{ title: 'Linux System Admin Basics', type: 'tutorial', url: 'https://www.digitalocean.com/community/tutorials/how-to-use-linux' }] }, { name: 'Git Workflows', resources: [{ title: 'Atlassian Git Tutorial', type: 'tutorial', url: 'https://www.atlassian.com/git/tutorials' }] }] },
        { stage: 'Containers & CI/CD', skills: [{ name: 'Docker', resources: [{ title: 'Docker Official Tutorial', type: 'docs', url: 'https://docs.docker.com/get-started/' }] }, { name: 'CI/CD Pipelines', resources: [{ title: 'GitHub Actions', type: 'docs', url: 'https://docs.github.com/en/actions' }] }] },
        { stage: 'Orchestration', skills: [{ name: 'Kubernetes', resources: [{ title: 'Kubernetes Basics', type: 'tutorial', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' }] }, { name: 'Infrastructure as Code (Terraform)', resources: [{ title: 'Terraform Learn', type: 'tutorial', url: 'https://developer.hashicorp.com/terraform/tutorials' }] }] },
    ],
    'Platform Engineer': [
        { stage: 'Foundation', skills: [{ name: 'Cloud Provider Tech (AWS/GCP)', resources: [{ title: 'AWS Skill Builder', type: 'course', url: 'https://skillbuilder.aws/' }] }, { name: 'Helm Charts', resources: [{ title: 'Helm Quickstart', type: 'docs', url: 'https://helm.sh/docs/intro/quickstart/' }] }] },
        { stage: 'Mesh & Delivery', skills: [{ name: 'Service Mesh (Istio)', resources: [{ title: 'Istio Setup', type: 'docs', url: 'https://istio.io/latest/docs/setup/getting-started/' }] }, { name: 'GitOps (ArgoCD)', resources: [{ title: 'ArgoCD Docs', type: 'docs', url: 'https://argo-cd.readthedocs.io/en/stable/' }] }] },
        { stage: 'Developer Experience', skills: [{ name: 'Internal Developer Platforms', resources: [{ title: 'Backstage.io', type: 'docs', url: 'https://backstage.io/' }] }, { name: 'Observability Stack', resources: [{ title: 'OpenTelemetry', type: 'docs', url: 'https://opentelemetry.io/' }] }] },
    ],
    'Automation Engineer': [
        { stage: 'Automation Coding', skills: [{ name: 'Python Scripting', resources: [{ title: 'Automate the Boring Stuff', type: 'book', url: 'https://automatetheboringstuff.com/' }] }, { name: 'Bash Scripting', resources: [{ title: 'Bash Guide', type: 'tutorial', url: 'https://mywiki.wooledge.org/BashGuide' }] }] },
        { stage: 'Config Management', skills: [{ name: 'Ansible', resources: [{ title: 'Ansible Getting Started', type: 'docs', url: 'https://docs.ansible.com/ansible/latest/getting_started/index.html' }] }, { name: 'Puppet / Chef', resources: [{ title: 'Puppet Learn', type: 'docs', url: 'https://www.puppet.com/docs/puppet/latest/puppet_index.html' }] }] },
        { stage: 'Test Automation', skills: [{ name: 'Selenium / Playwright', resources: [{ title: 'Playwright Specs', type: 'docs', url: 'https://playwright.dev/docs/intro' }] }, { name: 'Pipeline Automation Scripts', resources: [{ title: 'Jenkins Pipeline Tutorial', type: 'tutorial', url: 'https://www.jenkins.io/doc/book/pipeline/' }] }] },
    ],
};

// Fallback resources if something is not found generically
const getFallbackResources = (skillName) => [
    { title: 'MDN Web Docs', type: 'docs', url: `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(skillName)}`, free: true },
    { title: 'YouTube Tutorials', type: 'video', url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skillName)}+tutorial`, free: true },
    { title: 'freeCodeCamp', type: 'tutorial', url: 'https://www.freecodecamp.org/', free: true }
];

// Helper: convert a display name to a URL-safe slug
const toSlug = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// POST /api/v1/roadmap/generate
const generateRoadmap = async (req, res, next) => {
    try {
        const { domain, careerPath, level = 'Beginner' } = req.body;
        const userId = req.user._id;

        if (!domain || !careerPath) {
            return res.status(400).json({ success: false, message: 'Please provide domain and careerPath.' });
        }

        const stageDefinitions = CAREER_SKILL_MAP[careerPath];
        if (!stageDefinitions) {
            return res.status(400).json({ success: false, message: `No skill map found for career path: "${careerPath}".` });
        }

        // Deterministic slug: same domain+careerPath+level always reuses the same roadmap document.
        const careerSlug = `${toSlug(domain)}-${toSlug(careerPath)}-${toSlug(level)}`;

        // Build stages — creating/reusing Skill documents on the fly using the detailed objects
        const stages = await Promise.all(
            stageDefinitions.map(async (stageObj, idx) => {
                const stageTitle = stageObj.stage;
                const skillItems = stageObj.skills;

                const mappedSkills = await Promise.all(skillItems.map(async (skillItem) => {
                    // Extract name and override resources
                    const skillName = skillItem.name;
                    const curatedResources = skillItem.resources && skillItem.resources.length > 0 
                                             ? skillItem.resources 
                                             : getFallbackResources(skillName);
                    
                    const skillId = toSlug(skillName);
                    let skill = await Skill.findOne({ skillId });
                    
                    if (!skill) {
                        skill = await Skill.create({
                            skillId,
                            skillName,
                            category: domain,
                            description: `Learn ${skillName} — a critical component of the ${careerPath} lifecycle.`,
                            difficulty: idx === 0 ? 'Beginner' : idx === 1 ? 'Intermediate' : 'Advanced',
                            duration: '1-2 weeks',
                            resources: curatedResources,
                        });
                    } else {
                        // If skill exists but may lack detailed resources (from previous mock data), optionally update it:
                        // For safety, we keep existing objects, but our curated ones have more precision.
                        // (Uncomment updating logic below if we want to overwrite old generic resources)
                        // await Skill.updateOne({ _id: skill._id }, { resources: curatedResources });
                    }
                    
                    return { skillId: skill.skillId, name: skill.skillName, difficulty: skill.difficulty };
                }));

                return {
                    stage: idx + 1,
                    title: stageTitle,
                    description: `Master ${stageTitle.toLowerCase()} concepts on your way to becoming a ${careerPath}.`,
                    skills: mappedSkills,
                };
            })
        );

        const totalSkills = stages.reduce((sum, s) => sum + s.skills.length, 0);

        // Calculate specific duration scaling based on total components
        const estimatedDuration = `${stageDefinitions.length * 3}–${stageDefinitions.length * 5} weeks`;

        // Upsert so repeated calls don't create duplicates
        const roadmap = await Roadmap.findOneAndUpdate(
            { career: careerSlug },
            { career: careerSlug, title: careerPath, totalSkills, stages },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        // Assign career goal to user
        await User.findByIdAndUpdate(userId, { careerGoal: careerSlug });

        // Build a list of featured resources from the top stage to recommend globally
        const featuredResources = stageDefinitions[0]?.skills[0]?.resources || getFallbackResources(careerPath);

        // Return precisely matching JSON for the frontend
        res.status(200).json({
            success: true,
            data: {
                career: careerSlug,
                careerPath,
                domain,
                level,
                estimatedDuration,
                stages: stages.map(s => ({
                    stage: s.title,
                    skills: s.skills.map(sk => sk.name),
                })),
                resources: featuredResources,
            },
        });
    } catch (error) {
        next(error);
    }
};

// POST /api/v1/roadmap/custom
const createCustomRoadmap = async (req, res, next) => {
    try {
        const { name, skills, level, domain } = req.body;
        const userId = req.user._id;

        if (!name || !skills || !Array.isArray(skills) || skills.length === 0) {
            return res.status(400).json({ success: false, message: 'Please provide a valid name and an array of skills.' });
        }

        const careerSlug = `custom-${userId}-${Date.now()}`;

        // 1. Ensure global skills exist, creating them dynamically if needed.
        const mappedSkills = await Promise.all(skills.map(async (skillName) => {
            const normalizedSkillId = skillName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            let skill = await Skill.findOne({ skillId: normalizedSkillId });

            if (!skill) {
                // Determine a sub-difficulty or simply map the requested level
                skill = await Skill.create({
                    skillId: normalizedSkillId,
                    skillName: skillName,
                    category: domain || 'General Tech',
                    description: `Custom generated skill path for ${skillName} within the ${domain || 'General Tech'} domain.`,
                    difficulty: level || 'Beginner',
                    duration: '1-2 weeks',
                    resources: [
                        { title: 'MDN Web Docs', type: 'docs', url: `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(skillName)}`, free: true },
                        { title: 'YouTube Tutorials', type: 'video', url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skillName)}+tutorial`, free: true },
                        { title: 'freeCodeCamp', type: 'tutorial', url: 'https://www.freecodecamp.org/', free: true }
                    ]
                });
            }

            return {
                skillId: skill.skillId,
                name: skill.skillName,
                difficulty: skill.difficulty
            };
        }));

        // 2. Generate roadmap stages
        // We'll dynamically group them if possible, or just build 4 typical stages.
        // For simplicity, we chunk the mappedSkills into 4 functional buckets representing stages.
        const stageTitles = ['Fundamentals', 'Programming', 'Specialization', 'Projects'];
        
        let stages = [];
        let chunkSize = Math.ceil(mappedSkills.length / 4);
        if (chunkSize === 0) chunkSize = 1;

        for (let i = 0; i < 4; i++) {
            const stageSkills = mappedSkills.slice(i * chunkSize, (i + 1) * chunkSize);
            if (stageSkills.length > 0) {
                 stages.push({
                     stage: i + 1,
                     title: stageTitles[i] || `Stage ${i+1}`,
                     description: `Learn the ${stageTitles[i] ? stageTitles[i].toLowerCase() : `stage ${i+1}`} for ${name}.`,
                     skills: stageSkills
                 });
            }
        }

        // 3. Save roadmap to DB
        const roadmap = await Roadmap.create({
            career: careerSlug,
            title: name,
            totalSkills: mappedSkills.length,
            stages: stages
        });

        // 4. Assign roadmap to user goal
        await User.findByIdAndUpdate(userId, { careerGoal: careerSlug });

        res.status(201).json({ success: true, data: roadmap });
    } catch (error) {
        next(error);
    }
};

// GET /api/v1/roadmap/:career
const getRoadmap = async (req, res, next) => {
    try {
        const career  = req.params.career.toLowerCase().trim();
        const roadmap = await Roadmap.findOne({ career });

        if (!roadmap) {
            return res.status(404).json({
                success: false,
                message: `No roadmap found for career: ${req.params.career}`,
            });
        }

        res.status(200).json({ success: true, data: roadmap });
    } catch (error) {
        next(error);
    }
};

// GET /api/v1/roadmap
const getAllRoadmaps = async (req, res, next) => {
    try {
        const roadmaps = await Roadmap.find().select('career title stages');
        res.status(200).json({ success: true, count: roadmaps.length, data: roadmaps });
    } catch (error) {
        next(error);
    }
};

module.exports = { getRoadmap, getAllRoadmaps, createCustomRoadmap, generateRoadmap };
