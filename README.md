
# 🧭 CodeNavigator - Smart Learning Path Generator

**CodeNavigator** is a full-stack web application designed to help students and aspiring developers generate personalized learning roadmaps for various tech careers. It addresses the common problem of navigating the vast world of online learning resources by providing a structured, goal-oriented path.

## ✨ Features

-   🗺️ **Personalized Roadmap Generation**: Select a career path (e.g., Frontend, Backend, Full Stack) and get a curated learning roadmap.
-   🔍 **Skill Gap Analysis**: Assess your current skills to identify what you need to learn next.
-   📊 **Progress Tracking**: Mark skills as "in-progress" or "completed" and visualize your journey.
-   📚 **Curated Resources**: Each skill in the roadmap comes with a list of high-quality learning resources (articles, videos, tutorials).
-   🔐 **User Authentication**: Secure sign-up and login functionality to save your progress.
-   📱 **Responsive Design**: A modern, clean, and mobile-friendly user interface built with Tailwind CSS.

## 🛠️ Tech Stack

### 💻 Frontend

-   **Framework**: React
-   **Styling**: Tailwind CSS
-   **Routing**: React Router
-   **State Management**: React Context API
-   **Build Tool**: Vite

### ⚙️ Backend

-   **Framework**: Node.js with Express
-   **Database**: MongoDB with Mongoose
-   **Authentication**: JSON Web Tokens (JWT)
-   **Middleware**: Helmet, CORS, Express Rate Limit, Morgan

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18.0.0 or higher)
-   npm (or yarn)
-   MongoDB (local or a cloud instance like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YASHASHRIKADU/CodeNavigator.git
    cd CodeNavigator
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    ```
    
    - Start the backend server:
      ```bash
      npm run dev
      ```

3.  **Setup Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```
    - The frontend will connect to the backend API running on `http://localhost:5000`.
    - Start the frontend development server:
      ```bash
      npm run dev
      ```

4.  **Open the application:**
    - The application should now be running at `http://localhost:5173`.

## 📡 API Endpoints

The backend provides the following RESTful API endpoints under the `/api/v1` prefix:

-   `POST /auth/signup`: Register a new user.
-   `POST /auth/login`: Log in a user.
-   `GET /auth/profile`: Get the current user's profile.
-   `GET /careers`: Get a list of available career paths.
-   `GET /roadmap/:career`: Get the roadmap for a specific career.
-   `GET /skills`: Get a list of all skills.
-   `POST /progress`: Update the user's progress on a skill.
-   `GET /progress/:userId`: Get the progress for a specific user.
-   `GET /resources`: Get all learning resources.

## ☁️ Deployment

The frontend is deployed on **Vercel** and the backend is deployed on **Render**.

-   **Frontend (Vercel)**: `https://code-navigator-blond.vercel.app/`
-   **Backend (Render)**: The API is live and connected to the deployed frontend.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
