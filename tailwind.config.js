/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', 
    './src/assets/css/main.css', // * Observa los componentes CSS de Tailwind
  ],
  theme: {
    extend: {
      colors: {
        'primary-50':  '#faf5ff',
        'primary-100': '#f3e8ff',
        'primary-200': '#e9d5ff',
        'primary-300': '#d8b4fe',
        'primary-400': '#c084fc',
        'primary-500': '#a855f7',
        'primary-600': '#9333ea',
        'primary-700': '#7e22ce',
        'primary-800': '#6b21a8',
        'primary-900': '#581c87',
        'primary-950': '#3b0764',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animated')
  ],
}

