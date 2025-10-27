/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A3746',
          50: '#E6F0F3',
          100: '#CCE0E7',
          200: '#99C1CE',
          300: '#66A3B6',
          400: '#33849D',
          500: '#0A3746',
          600: '#082C38',
          700: '#06212A',
          800: '#04161C',
          900: '#020B0E',
        },
        accent: {
          DEFAULT: '#10B981',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
      },
    },
  },
  plugins: [],
}

