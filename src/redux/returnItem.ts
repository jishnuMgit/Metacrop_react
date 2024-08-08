import { ReturnItemObject } from '@/schema'
import { ApiItem, ApiSoldItem } from '@/utils/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InferType } from 'yup'

export type ReturnItemType = InferType<typeof ReturnItemObject> & {
  saleId: number | string
  item: ApiSoldItem & { ItemName: ApiItem['ItemName'] }
}
type ReturnSales = {
  saleId: string | number
  items: Omit<ReturnItemType, 'saleId'>[]
}
export type PayloadIDs = { soldItemId: number; saleId: number }
const INITIAL_STATE: { sales: ReturnSales[] } = {
  sales: [],
}
const returnItemSlice = createSlice({
  name: 'return_item',
  initialState: INITIAL_STATE,
  reducers: {
    addToReturn: (state, action: PayloadAction<ReturnItemType>) => {
      const sale = state.sales.find(
        (val) => val.saleId === action.payload.saleId
      )
      const { saleId, ...rest } = action.payload
      const itemInitial = { ...rest, returnQty: 1 }
      if (!sale) {
        state.sales.push({ saleId: saleId, items: [itemInitial] })
        return
      }
      const soldItem = sale.items.find(
        (val) => val.PKSoldItemID === action.payload.PKSoldItemID
      )
      if (!soldItem) {
        sale.items.push(itemInitial)
        return
      }
    },
    incrementReturn: (state, action: PayloadAction<PayloadIDs>) => {
      const { saleId, soldItemId } = action.payload
      const sale = state.sales.find((s) => s.saleId === saleId)
      if (sale) {
        for (const item of sale.items) {
          if (
            item.PKSoldItemID === soldItemId &&
            item.item.Qty > item.returnQty!
          ) {
            item.returnQty!++
            break
          }
        }
      }
    },
    decrementReturn: (state, action: PayloadAction<PayloadIDs>) => {
      const { saleId, soldItemId } = action.payload
      const sale = state.sales.find((s) => s.saleId)
      if (sale) {
        for (const item of sale.items) {
          if (item.PKSoldItemID === soldItemId) {
            if (item.returnQty! > 1) {
              item.returnQty!--
            } else {
              sale.items = sale.items.filter(
                (i) => i.PKSoldItemID !== soldItemId
              )
              if (sale.items.length === 0) {
                state.sales = state.sales.filter((s) => s.saleId !== saleId)
              }
            }
            break
          }
        }
      }
    },
    removeFromReturns: (state, action: PayloadAction<PayloadIDs>) => {
      const { saleId, soldItemId } = action.payload
      const sale = state.sales.find((s) => s.saleId === saleId)
      if (sale) {
        sale.items = sale.items.filter(
          (item) => item.PKSoldItemID !== soldItemId
        )
      }
    },
    clearReturn: (state) => {
      state.sales = []
    },
  },
})

export const {
  addToReturn,
  incrementReturn,
  decrementReturn,
  clearReturn,
  removeFromReturns,
} = returnItemSlice.actions
export default returnItemSlice.reducer
