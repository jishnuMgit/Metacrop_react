export const baseImgUrl = 'src/assets/images/'
// COOKIE_TTL value is days
export const COOKIE_TTL = 1

export const btnStyles = {
  primary: `bg-blue-400 hover:bg-blue-600  text-white  rounded-md`,
  secondary: `bg-[#82C1FC] text-white rounded-2xl secondary-shadow hover:bg-[#429CF0] `,
} as const

export const initialFormValues = {
  login: {
    email: '',
    password: '',
  },
}

export const paths = {
  home: '/',
  sales: '/sales',
  settings: '/settings',
  test: '#link',
} as const
