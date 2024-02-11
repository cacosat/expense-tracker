/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bgColor: "#000000"
      },
      screens: {
        'xxs': '300px',
        'xs': '450px'
      }
    },
  },
  plugins: [
    "prettier-plugin-tailwindcss"
  ],
}

