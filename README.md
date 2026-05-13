CodeNavigator
Smart Learning Path Generator

CodeNavigator is a full-stack web application that helps users choose a tech career path and follow a structured learning roadmap with personalized skills, resources, and progress tracking.

The platform dynamically generates career-based roadmaps and displays relevant learning resources based on the selected domain and career path.

🚀 Features
Dynamic career-based roadmap generation
Skill-wise progress tracking
Backend-driven resource management
Personalized dashboard
Custom career path builder
Search and filter functionality
Responsive UI with dark/light theme
OTP-based forgot password system
Real-time dynamic updates without page reload
🛠 Tech Stack
Frontend
React.js
JavaScript
HTML5
CSS3 / Tailwind CSS
React Router
Backend
Node.js
Express.js
Database
MongoDB
APIs & Tools
REST APIs
Nodemailer
JWT Authentication
📌 Problem Statement

Many students and beginners face difficulty deciding:

What to learn
In what order to learn
Which resources are best for a specific tech career

Most platforms only provide scattered resources without a proper structured learning path.

CodeNavigator solves this by providing structured career roadmaps with skills, resources, and progress tracking.

💡 How It Works
User logs in to the platform.
User selects a domain and career path.
Backend dynamically fetches roadmap data.
Skills are displayed stage-by-stage.
User can view resources for each skill.
User updates progress status.
Dashboard updates progress dynamically.
🎯 Career Domains Supported
Web Development
AI
Cloud Computing
Cybersecurity
Data Science
DevOps
Mobile App Development
Game Development
📚 Key Features Explained
1. Dynamic Career Roadmaps

Roadmaps are generated dynamically based on the selected career path.

2. Skill-Based Resource System

Each skill contains separate learning resources such as:

Documentation
Tutorials
Videos
Practice websites
3. Progress Tracking

Users can mark skills as:

Not Started
In Progress
Completed
4. Custom Career Builder

Users can create their own custom learning path.

5. OTP-Based Password Reset

Secure forgot password system using email OTP verification.

📂 Project Structure
CodeNavigator/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── store/
│   └── services/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── utils/
│
└── README.md
⚙️ Installation & Setup
1. Clone Repository
git clone https://github.com/your-username/CodeNavigator.git
2. Install Frontend Dependencies
cd frontend
npm install
3. Install Backend Dependencies
cd backend
npm install
🔐 Environment Variables

Create a .env file in backend:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
▶️ Run Project
Start Backend
cd backend
npm run dev
Start Frontend
cd frontend
npm run dev
📡 API Endpoints
Authentication
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/send-otp
POST /api/v1/auth/reset-password
Roadmaps
GET /api/v1/roadmaps
GET /api/v1/roadmaps/:career
Skills
GET /api/v1/skills/:skillId
Resources
GET /api/v1/resources/:career
🧩 Challenges Faced
Managing dynamic roadmap and resource mapping
Fixing API synchronization issues
Handling dynamic state updates without page reload
Implementing scalable backend-driven architecture
🚀 Future Improvements
AI-based career recommendations
Advanced analytics dashboard
Community discussion forum
Mobile application support
AI chatbot for guidance
👨‍💻 Author

Yashashri
