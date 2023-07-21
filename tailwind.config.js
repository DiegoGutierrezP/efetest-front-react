/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");


export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // primary: {
        //   DEFAULT: '#bfa094',
        //   50: '#fdf8f6',
        //   100: '#f2e8e5',
        //   200: '#eaddd7',
        //   300: '#e0cec7',
        //   400: '#d2bab0',
        //   500: '#bfa094',
        //   600: '#a18072',
        //   700: '#977669',
        //   800: '#846358',
        //   900: '#43302b',
        // },
        primary:'#0661E7'
      }
    },
  },
  plugins: [],
})