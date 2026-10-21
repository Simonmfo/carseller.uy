/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
      },
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e30613', // Car Seller Red
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        "secondary-container": "#dc2626",
        "on-secondary-container": "#ffffff",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-container": "var(--color-surface-container)",
        "surface-container-high": "var(--color-surface-container-high)",
        "surface-container-low": "var(--color-surface-container-low)",
        "surface-container-lowest": "var(--color-surface-container-lowest)",
        "outline-variant": "var(--color-outline-variant)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        secondary: "var(--color-secondary)",
      }
    },
  },
  plugins: [],
}
