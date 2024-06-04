import { ProductType } from '@/db'
import { array, number, object, string } from 'yup'

export const LoginSchema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8).max(30).required('password must entered'),
})

const BillGenerateObj = object({
  PKItemID: number().required(),
  Price: number(),
  Qty: number(),
})

export const BillGenerate = array(BillGenerateObj).transform(
  (_, original: ProductType[]) =>
    original.map((val) => ({ ...val, Qty: val.qty }))
)
