/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#87CEFA",
        secondary: "#16181D",
        bgblacktp: 'rgba(255, 255, 255, 0.69)',
      }
    },
  },
  plugins: [],
}
