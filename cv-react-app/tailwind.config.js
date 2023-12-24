/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bgColor: "#000000"
      },
      screens: {
        'max-sm': {'max': '420px'},
        'max-md': {'max': '767px'},
        'max-lg': {'max': '1023px'},
        'max-xl': {'max': '1279px'},
        'max-2xl': {'max': '1535px'}
      }
    },
  },
  plugins: [
    "prettier-plugin-tailwindcss"
  ],
}

