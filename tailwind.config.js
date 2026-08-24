/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#050B08",
          900: "#070E0B",
          850: "#0B1612",
          800: "#0F1E19",
          750: "#142921",
          700: "#1C372D",
          600: "#274F41",
        },
        emerald: {
          accent: "#10B981",
          bright: "#34D399",
          muted: "#059669",
          glow: "rgba(16, 185, 129, 0.15)",
        },
        gold: {
          accent: "#F59E0B",
          bright: "#FBBF24",
          muted: "#D97706",
          glow: "rgba(245, 158, 11, 0.18)",
        },
        text: {
          primary: "#ECFDF5",
          secondary: "#94A3B8",
          muted: "#64748B",
          code: "#A7F3D0",
        },
      },
      fontFamily: {
        sans: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-ibm-mono)", "monospace"],
      },
      boxShadow: {
        "emerald-glow": "0 0 25px -5px rgba(16, 185, 129, 0.25)",
        "gold-glow": "0 0 25px -5px rgba(245, 158, 11, 0.25)",
        "card-hover": "0 12px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px -3px rgba(16, 185, 129, 0.15)",
      },
      animation: {
        "pulse-fast": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanline": "scanline 6s linear infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
