/** @type {import('tailwindcss').Config} */
export const darkMode = ['class'];
export const content = ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'];
export const prefix = '';
export const theme = {
    container: {
        center: true,
        padding: '2rem',
        screens: {
            '2xl': '1400px',
        },
    },
    colors: {
        dark: '#0a142f',
        gray: '#7a7a7a',
        'light-gray': '#d8ddec',
        white: '#ffffff',
        'dark-primary': '#153580',
        blue: '#549bff',
        'light-primary': '#ECEFF3',
        'white-primary': '#F7F9FD',
        warning: '#ffefdc',
        danger: '#af3b3b',
    },
    extend: {
        keyframes: {
            'accordion-down': {
                from: { height: '0' },
                to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
                from: { height: 'var(--radix-accordion-content-height)' },
                to: { height: '0' },
            },
        },
        animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
        },
    },
};
export const plugins = [];
