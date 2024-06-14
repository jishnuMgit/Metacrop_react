/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind'
import withMt from '@material-tailwind/react/utils/withMT'

export default withMt({
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    flowbite.content(),
    'node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
})
