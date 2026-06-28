/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF3F6C",
        secondary: "#FFF1F5",
        background: "#FFFFFF",
        lightGray: "#F8F9FB",
        textPrimary: "#1A1A1A",
        textSecondary: "#6B7280",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
