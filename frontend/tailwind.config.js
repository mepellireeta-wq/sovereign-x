/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          600: '#0b3c5d', // MRPL Deep Navy Blue
          700: '#072a42',
          800: '#051f32',
          900: '#031422',
        },
        gold: {
          500: '#d4af37',
        }
      }
    },
  },
  plugins: [],
}
