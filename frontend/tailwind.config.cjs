/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spectral: ['Spectral', 'serif'],
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
};
