/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        fire: {
          50: '#fff7f0',
          100: '#ffefe1',
          200: '#ffd2b8',
          300: '#ffb487',
          400: '#ff8b4d',
          500: '#ff5f1f',
          600: '#e64f18',
          700: '#b43a10',
          800: '#8a2b0c',
          900: '#5e1b05',
        },
      },
    },
  },
  plugins: [],
};
