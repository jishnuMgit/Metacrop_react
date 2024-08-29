/** @type {import('tailwindcss').Config} */
import withMt from '@material-tailwind/react/utils/withMT'

export default withMt({
  darkMode: 'selector',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary-bg': '#191C24',
        'dark-text-color': '#A6A9BF',
        'dark-btn-color': '#eb1616',
        'dark-btn-hover': '#c81313',
      },
    },
  },
  plugins: [],
})
