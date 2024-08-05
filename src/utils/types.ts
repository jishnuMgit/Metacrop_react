import { sortOptions } from '@/config/constants'
import { QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode'
import { Html5QrcodeScannerConfig } from 'html5-qrcode/esm/html5-qrcode-scanner'
import { ChangeEvent } from 'react'

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
 *  ```js
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
  CreatedOn: '2024-02-24T12:53:58.000Z'
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
  Qty: number
  ReOrderLevel: number
  RepFlag: number
  TaxPer: number
  //
  qty: number
  id: number
}

export type ApiSoldItem = {
  CreatedOn: string
  FKItemID: number
  FKSaleID: number
  Item: ApiItem
  ModifiedOn: string
  PKSoldItemID: number
  Price: number
  Qty: number
  SubTotal: number
  //this for copy current qty
  oldQty?: number
}
/**
 * sales response api data type
 */
export type ApiSalesData = {
  CreatedOn: string
  ModifiedOn: string
  PKSaleID: number | string
  TotalAmount: number | string
  SoldItems: ApiSoldItem[]
  SoldItemsReturn: ApiSalesReturn[]
}

/**
 * sales return response api data type
 */
export type ApiSalesReturn = {
  CreatedOn: string
  FKItemID: number | string
  FKSoldItemID: number | string
  FKSaleID: number | string
  PKReturnID: number | string
  Qty: number
  SubTotal: number | string
  Price: number
  Item: { ItemName: number }
}

/**
 * Sort types
 */
export type SortTypes = 'id' | 'date' | 'price'
export type SortOrder = 'asc' | 'desc'
export type SortOption = {
  option:
    | `?sort=${(typeof sortOptions)[keyof typeof sortOptions]}`
    | 'most-saled'
}
