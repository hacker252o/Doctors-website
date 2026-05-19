/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],

  theme: {
    extend: {
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Manrope", "sans-serif"],
      },

      colors: {
        brand: {
          50: "#F0F7FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },

        ink: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          300: "#CBD5E1",
          500: "#64748B",
          700: "#334155",
          900: "#0F172A",
        },
      },

      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },

      boxShadow: {
        glass: "0 8px 32px rgba(15,23,42,0.08)",
        soft: "0 4px 24px rgba(15,23,42,0.05)",
        glow: "0 20px 60px -20px rgba(30,58,138,0.35)",
      },

      keyframes: {
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },

          "100%": {
            backgroundPosition: "200% 0",
          },
        },

        pulseRing: {
          "0%": {
            boxShadow: "0 0 0 0 rgba(34,197,94,0.4)",
          },

          "100%": {
            boxShadow: "0 0 0 20px rgba(34,197,94,0)",
          },
        },
      },

      animation: {
        shimmer: "shimmer 2s linear infinite",
        pulseRing: "pulseRing 1.5s infinite",
      },
    },
  },

  plugins: [],
};