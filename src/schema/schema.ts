import { ApiItem, ApiSalesData } from '@/utils/types'
import { array, number, object, string } from 'yup'

/**
 * Login Validation
 */
export const LoginSchema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8).max(30).required('password must entered'),
})

const BillGenerateObj = object({
  PKItemID: number().required(),
  Price: number(),
  Qty: number(),
})

/**
 * transform to api expecting data on create sale.
 */
export const BillGenerate = array(BillGenerateObj).transform(
  (_, original: ApiItem[]) => original.map((val) => ({ ...val, Qty: val.qty }))
)

export const UpdateItemObject = object({
  PKSoldItemID: number().required(),
  Qty: number().required(),
  FKItemID: number().required(),
  Price: number().required(),
})

/**
 * transform to api expecting data on update sale.
 */
export const UpdateSale = object({
  subTotal: number().required(),
  soldItems: array(UpdateItemObject),
}).transform((_, original: ApiSalesData) => {
  const updatedItems = original.SoldItems.filter(
    (val) => val.Qty !== val.oldQty
  )
  return {
    subTotal: updatedItems.reduce((acc, val) => acc + val.Qty * val.Price, 0),
    soldItems: updatedItems,
  }
})

/**
 * transform to api expecting data on return item with qty.
 */

export const ReturnItem = object({
  PKSoldItemID: number(),
  returnQty: number(),
}).required()
