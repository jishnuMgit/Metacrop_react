export const baseImgUrl = 'src/assets/images/'

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
  test: '#link',
} as const
