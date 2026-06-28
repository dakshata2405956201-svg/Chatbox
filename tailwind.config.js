/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF1F5",
          100: "#FFE0E8",
          200: "#FFC1D1",
          300: "#FF93AE",
          400: "#FF638B",
          500: "#FF3F6C",
          600: "#EE2A57",
          700: "#C71E46",
          800: "#A41B3C",
          900: "#871A36",
        },
        accent: "#FF3F6C",
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        success: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          500: "#10B981",
          600: "#059669",
        },
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          500: "#F59E0B",
        },
        error: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#EF4444",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(15, 23, 42, 0.06)",
        medium: "0 4px 16px rgba(15, 23, 42, 0.08)",
        strong: "0 8px 32px rgba(15, 23, 42, 0.10)",
      }
    },
  },
  plugins: [],
}
