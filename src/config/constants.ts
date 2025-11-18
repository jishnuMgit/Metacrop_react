export const baseImgUrl = '/src/assets/images/'
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

export const links = {
  HOME: '/',
  POS: '/sales/pos',
  SALES_LIST: '/sales/list',
  SALES_RETURN_LIST: '/sales/return',
  ADD_SALES_RETURN: '/sales/add-return',
  SETTINGS: '/settings',
  TEST: '#link',
  attendance:'/attendance',
  customers:'/customer/Customer',
  reconciliation:'/reconciliation',
  PaymentVoucher:'/PaymentVoucher'
} as const

export const sortOptions = {
  NONE: 'none',
  MOST_SALED: 'most-saled',
  RECENT: 'recent',
} as const

export const filterOptions = {
  NONE: 'none',
  ROL: 'rol',
  LEAST: 'least',
} as const

export const SALE_INVOICE_NAMES = [
  'Sale Date',
  'Modified Date',
  'Sale Id',
  'Total Items',
  'Discount',
  'Total Amount',
]

export const SALES_RETURN_INVOICE = ['Return Date', 'Return ID', 'Total Items', 'Total Amount']
