/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        background: '#FFFFFF',
        textPrimary: '#333333',
        textSecondary: '#888888',
      },
    },
  },
  plugins: [],
};
