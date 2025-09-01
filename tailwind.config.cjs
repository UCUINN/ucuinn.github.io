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
          50: '#f3f1fe',
          100: '#e9e4fd',
          200: '#d5ccfb',
          300: '#b7a7f7',
          400: '#9377f2',
          500: '#764aec',
          600: '#6241f5',
          700: '#4f1ed9',
          800: '#4219b5',
          900: '#381991',
        },
      },
    },
  },
  plugins: [],
};
