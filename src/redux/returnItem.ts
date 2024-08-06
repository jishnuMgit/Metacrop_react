import { ReturnItem } from '@/schema'
import { ApiItem, ApiSoldItem } from '@/utils/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InferType } from 'yup'

export type ReturnItemType = InferType<typeof ReturnItem> & {
  saleId: number | string
  item: ApiSoldItem & { ItemName: ApiItem['ItemName'] }
}
type ReturnSales = {
  saleId: string | number
  items: Omit<ReturnItemType, 'saleId'>[]
}

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
    incrementReturn: (state, action: PayloadAction<number>) => {
      state.sales.forEach((sale) => {
        sale.items.forEach((item) => {
          if (
            item.PKSoldItemID === action.payload &&
            item.item.Qty > item.returnQty!
          ) {
            item.returnQty!++
          }
        })
      })
    },
    decrementReturn: (state, action: PayloadAction<number>) => {
      state.sales.forEach((sale) => {
        sale.items.forEach((item, index, arr) => {
          if (item.PKSoldItemID === action.payload) {
            if (item.returnQty! > 1) {
              item.returnQty!--
            } else {
              arr.splice(index, 1)
            }
            return
          }
        })
      })
    },
    removeFromReturns: (state, action: PayloadAction<number>) => {
      state.sales.forEach((sale) => {
        sale.items = sale.items.filter(
          (item) => item.PKSoldItemID !== action.payload
        )
      })
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
