/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#F9F7FF', // very light background (lavender tint)
          100: '#F1ECFE', // subtle light purple
          200: '#D8CCFC', // soft lavender
          300: '#B9A7F7', // light purple
          400: '#9776F2', // medium purple
          500: '#7C4AED', // main brand purple
          600: '#6536E3', // slightly darker accent
          700: '#5329C7', // deep purple
          800: '#4320A3', // darker background tone
          900: '#351A83', // almost eggplant, strong contrast
        },
        'ghost-white': '#FEFAEF',
        'cream': '#FEFAEF',
      },
    },
  },
  plugins: [],
};
