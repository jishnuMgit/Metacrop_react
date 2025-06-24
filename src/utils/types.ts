import { filterOptions } from '@/config/constants'
import { BillGenerate } from '@/schema'
import { QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode'
import { Html5QrcodeScannerConfig } from 'html5-qrcode/esm/html5-qrcode-scanner'
import { ChangeEvent } from 'react'
import { InferType } from 'yup'

export type InputTypes = 'text' | 'number' | 'password' | 'email'
export type ButtonTypes = 'button' | 'submit'

export type InputProps = {
  type: InputTypes
  name?: string
  value?: string
  label?: string
  className?: string
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export type IconProps = React.SVGProps<SVGSVGElement> & {
  onclick?: () => void
}
export type HandleQty = {
  decrement: (id: number) => void
  increment: (id: number) => void
}

// QrcodePlugin props types
export type QrPluginProps = {
  onSuccess: QrcodeSuccessCallback
  onFailure?: QrcodeErrorCallback
  verbose?: boolean
} & Html5QrcodeScannerConfig

/**
 * Dynamic table col type.
 *  ```ts
 * //achieve incremental name for column.
 * const tableCol: DynamicTableCol = {
   col1: 'foo',
   col2: 'bar',
   col3: 'some',
   //col4...
  }
 * ```
 */
type ColumnKeys = `col${number}`
export type DynamicTableCol = {
  [key in ColumnKeys]?: { value: string | number; prefix?: string }
}

export type ApiItem = {
  Class: string
  CreatedBy: number
  CreatedOn: string
  DelFlag: number
  FKCmpID: number
  FKGroupID: number
  FKManufactureID: number
  FKStoreID: number
  FKUnitID: number
  HSNCode: string
  ItemCode: string
  ItemName: string
  Lcost: number
  MaxLevel: number
  ModifiedBy: number
  ModifiedOn: number
  PKItemID: number
  Price: number
  taxAmt: number
  Qty: number
  ReOrderLevel: number
  RepFlag: number
  TaxPer: number

  /*
   * below types not actual Item propreties. this propreties not in database.
   * this propreties may add after api call in frontend for redux and other
   * purposes.
   */
  qty: number
  id: unknown
  customPrice?: number
}

export type ApiSoldItem = {
  ItemName: string | number
  CreatedOn: string
  FKItemID: number
  FKSaleID: number
  Item: ApiItem
  ModifiedOn: string
  PKSoldItemID: number
  taxAmt: number

  Price: number
  Qty: number
  SoldPrice: number
  SubTotal: number
  //this for copy current qty. not in db.
  oldQty?: number
}
/**
 * sales response api data type
 */
export type ApiSalesData = {
  CreatedOn: string
  modifiedOn: string
  PKSaleID: number | string
  Discount: number
  TotalAmount: number | string
  SoldItems: ApiSoldItem[]
  SalesReturnItems: ApiSalesReturnItem[]
}

/**
 * sales return api data type
 */
export type ApiSalesReturn = {
  Childs: any
  PKReturnID: number
  totalReturnAmount: number
  createdOn: string
  ModifiedOn: string
  SalesReturnItems: ApiSalesReturnItem[]
}
/**
 * sales return items response api data types
 */
export type ApiSalesReturnItem = {
  PKReturnItemID: number | string
  FKReturnID: number | string
  FKSaleID: number | string
  FKItemID: number | string
  CreatedOn: string
  Qty: number
  SubTotal: number | string
  Price: number
  Item: { ItemName: string }
}

/**
 * analytic response api data types
 */
type CommonArgsProps = { TotalAmount: number; Discount: number }
type AggregateArgs = {
  _sum: { TotalAmount: number }
  _count: number
  _avg: CommonArgsProps
  _max: CommonArgsProps
  _min: CommonArgsProps
}
type Totals = {
  TotalAmount: Number
}
export type ApiAnalyticsSales = {
  todayStat: AggregateArgs
  totalStat: AggregateArgs
  TotalCash: Totals
  TotalBank: Totals
}
/**
 * Sort types and filter types
 */
export type SortTypes = 'id' | 'date' | 'price' | 'item' | 'none'
export type SortOrder = 'asc' | 'desc'
export type SortOption = {
  option: `?sort=${SortTypes}` | 'most-saled'
}
export type FilterType = {
  option: `?filter=${(typeof filterOptions)[keyof typeof filterOptions]}`
}

export type QueryParamOpts = {
  sort?: SortOption['option']
  filter?: FilterType['option']
}

/**
 * Add sale item type on pos
 */
export type AddSaleItems = InferType<typeof BillGenerate>
