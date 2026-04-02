/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#edf3ff',
                    100: '#d0dff5',
                    200: '#a3bfea',
                    300: '#6f9bde',
                    400: '#3874d0',
                    500: '#051f45',   // user-given deep navy — sidebar & buttons
                    600: '#041837',   // hover (deeper navy)
                    700: '#031230',
                    800: '#020d22',
                    900: '#010812',
                },
                accent: {
                    DEFAULT: '#f2c4cd',   // user-given blush pink — highlights
                    dark: '#e9a0ad',   // deeper rose for hover states
                },
                secondary: {
                    DEFAULT: '#e9a0ad',   // deeper blush rose
                    dark: '#d97485',   // even deeper for contrast
                },
                success: '#22c55e',
                bg: {
                    light: '#fff8f9',   // barely-blush white — derived from pink
                    dark: '#fff8f9',   // same (light-only)
                },
                card: {
                    light: '#ffffff',
                    dark: '#ffffff',   // same (light-only)
                },
                border: {
                    light: '#fbe0e5',   // soft pink border — elegant
                    dark: '#fbe0e5',   // same (light-only)
                },
                text: {
                    primary: '#051f45', // user-given navy — as text color
                    secondary: '#5a6a80', // muted blue-gray
                },
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                xl: '10px',
                '2xl': '16px',
                '3xl': '24px',
            },
            boxShadow: {
                card: '0px 8px 24px rgba(0,0,0,0.06)',
                'card-hover': '0px 12px 32px rgba(5,31,69,0.14)',
                glow: '0 0 24px rgba(242,196,205,0.50)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
