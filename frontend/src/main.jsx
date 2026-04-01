import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Bootstrap theme from localStorage before first render
const savedTheme = localStorage.getItem('cn_theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
