import { object, string } from 'yup'

export const loginSchema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8).max(30).required('password must entered'),
})
