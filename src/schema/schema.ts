import { ApiItem, ApiSalesData } from '@/utils/types'
import { array, InferType, number, object, string } from 'yup'

/**
 * Login Validation
 */
export const LoginSchema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8).max(30).required('password must entered'),
})

const BillGenerateObj = object({
  PKItemID: number().required(),
  clientPrice: number().required(),
  Qty: number().required(),
}).required()

/**
 * transform to api expecting data on create sale.
 */
export const BillGenerate = array(BillGenerateObj).transform((_, original: ApiItem[]) =>
  original.map((val) => ({ ...val, Qty: val.qty, clientPrice: val.Price }))
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
  const updatedItems = original.SoldItems.filter((val) => val.Qty !== val.oldQty)
  return {
    subTotal: updatedItems.reduce((acc, val) => acc + val.Qty * val.Price, 0),
    soldItems: updatedItems,
  }
})

/**
 * transform to api expecting data on return item with qty.
 */

export const ReturnItemObject = object({
  PKSoldItemID: number().required(),
  returnQty: number(),
}).required()

export const nonSaleReturnObject = object({
  item: object({ PKItemID: number(), Price: number() }).required(),
  returnQty: number(),
})

export const SalesReturnSchema = object({
  sales: array(
    object({
      saleId: number().required(),
      items: array(ReturnItemObject).required(),
    })
  ).min(1),
  // for custom returns.
  nonSales: array(nonSaleReturnObject).optional().min(1),
}).transform((_, original: InferType<typeof SalesReturnSchema>) => {
  const { nonSales, sales } = original
  if (sales?.length === 0) {
    return { nonSales }
  }
  if (nonSales?.length === 0) {
    return { sales }
  }
  return original
})
