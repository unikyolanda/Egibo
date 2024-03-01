/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pr': '#1b1c46',
        'sc': '#666666',
        'purple-pr': '#4339e4'
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

