import DashboardLayout from '../layouts/DashboardLayout';
import ResourceList from '../components/ResourceList';
import { BookOpen } from 'lucide-react';

const resourceSections = [
    {
        title: 'HTML & CSS',
        resources: [
            { title: 'MDN Web Docs — HTML', type: 'docs', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', free: true },
            { title: 'CSS-Tricks', type: 'tutorial', url: 'https://css-tricks.com', free: true },
            { title: 'Flexbox Froggy', type: 'practice', url: 'https://flexboxfroggy.com', free: true },
        ]
    },
    {
        title: 'JavaScript',
        resources: [
            { title: 'JavaScript.info', type: 'docs', url: 'https://javascript.info', free: true },
            { title: 'freeCodeCamp JS Course', type: 'video', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', free: true },
            { title: 'Eloquent JavaScript', type: 'docs', url: 'https://eloquentjavascript.net', free: true },
        ]
    },
    {
        title: 'React',
        resources: [
            { title: 'React Official Documentation', type: 'docs', url: 'https://react.dev', free: true },
            { title: 'Scrimba React Course', type: 'tutorial', url: 'https://scrimba.com/learn/learnreact', free: false },
            { title: 'React Tutorial — Traversy Media', type: 'video', url: 'https://www.youtube.com/watch?v=LDB4uaJ87e0', free: true },
        ]
    },
    {
        title: 'Node.js & Backend',
        resources: [
            { title: 'Node.js Official Docs', type: 'docs', url: 'https://nodejs.org/docs/latest/api/', free: true },
            { title: 'Express.js Getting Started', type: 'docs', url: 'https://expressjs.com/en/starter/installing.html', free: true },
            { title: 'The Odin Project — NodeJS', type: 'tutorial', url: 'https://www.theodinproject.com/paths/full-stack-javascript', free: true },
        ]
    },
    {
        title: 'Python & Data Science',
        resources: [
            { title: 'Python.org Documentation', type: 'docs', url: 'https://docs.python.org/3/', free: true },
            { title: 'Kaggle — Free Courses', type: 'tutorial', url: 'https://www.kaggle.com/learn', free: true },
            { title: 'fast.ai — Practical Deep Learning', type: 'video', url: 'https://course.fast.ai', free: true },
        ]
    },
];

export default function ResourcesPage() {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold font-poppins text-text-primary dark:text-gray-100">Learning Resources</h1>
                    <p className="text-text-secondary dark:text-gray-400 text-sm mt-1">Curated free and premium resources for every skill area.</p>
                </div>

                {resourceSections.map(section => (
                    <div key={section.title} className="card">
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="w-5 h-5 text-primary-500" />
                            <h3 className="font-bold text-text-primary dark:text-gray-100 font-poppins">{section.title}</h3>
                        </div>
                        <ResourceList resources={section.resources} />
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}
