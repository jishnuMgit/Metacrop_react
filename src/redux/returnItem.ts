import { ReturnItemObject } from '@/schema'
import { ApiItem, ApiSoldItem } from '@/utils/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InferType } from 'yup'

export type ReturnItemType = InferType<typeof ReturnItemObject> & {
  saleId: number | string
} & ApiSoldItem & { ItemName: ApiItem['ItemName'] }

type ReturnSales = {
  saleId: string | number
  items: Omit<ReturnItemType, 'saleId'>[]
}
export type PayloadIDs = { soldItemId: number; saleId?: number }
export type CustomReturnType = {
  item?: ApiItem
  returnQty: number
}
const INITIAL_STATE: {
  sales: ReturnSales[]
  customReturn: CustomReturnType[]
} = {
  sales: [],
  customReturn: [],
}
const returnItemSlice = createSlice({
  name: 'return_item',
  initialState: INITIAL_STATE,
  reducers: {
    addToReturn: (
      state,
      action: PayloadAction<Partial<ReturnItemType> & { item?: ApiItem }>
    ) => {
      const { saleId, ...rest } = action.payload
      if (!saleId) {
        const item = state.customReturn.find(
          (val) => val.item?.PKItemID === rest.item?.PKItemID
        )
        if (item) {
          item.returnQty++
          return
        }
        state.customReturn.push({ item: rest.item, returnQty: 1 })
        return
      }
      const sale = state.sales.find(
        (val) => val.saleId === action.payload.saleId
      )
      const itemInitial = { ...rest, returnQty: 1 }
      if (!sale) {
        state.sales.push({
          saleId: saleId,
          items: [itemInitial as ReturnItemType],
        })
        return
      }
      const soldItem = sale.items.find(
        (val) => val.PKSoldItemID === action.payload.PKSoldItemID
      )
      if (!soldItem) {
        sale.items.push(itemInitial as ReturnItemType)
        return
      }
    },
    incrementReturn: (state, action: PayloadAction<PayloadIDs>) => {
      const { saleId, soldItemId } = action.payload
      if (!saleId) {
        state.customReturn.forEach((val) => {
          if (val.item?.PKItemID === soldItemId) {
            val.returnQty++
          }
        })
        return
      }
      const sale = state.sales.find((s) => s.saleId === saleId)
      if (sale) {
        for (const item of sale.items) {
          if (item.PKSoldItemID === soldItemId && item.Qty > item.returnQty!) {
            item.returnQty!++
            break
          }
        }
      }
    },
    decrementReturn: (state, action: PayloadAction<PayloadIDs>) => {
      const { saleId, soldItemId } = action.payload
      if (!saleId) {
        state.customReturn.forEach((val, index, arr) => {
          if (val.item?.PKItemID === soldItemId) {
            if (val.returnQty > 1) {
              val.returnQty--
            } else {
              arr.splice(index, 1)
            }
          }
        })
        return
      }
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
      if (!saleId) {
        const itemIndex = state.customReturn.findIndex(
          (val) => val.item?.PKItemID === soldItemId
        )
        state.customReturn.splice(itemIndex, 1)
        return
      }
      const sale = state.sales.find((s) => s.saleId === saleId)
      if (sale) {
        sale.items = sale.items.filter(
          (item) => item.PKSoldItemID !== soldItemId
        )
      }
    },
    clearReturn: (state) => {
      state.sales = []
      state.customReturn = []
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
