import { ApiItem } from '@/utils/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = { orders: ApiItem[]; totalAmount: number; discount?: number | string }
const INITIAL_STATE: InitialState = {
  orders: [],
  discount: undefined,
  totalAmount: 0,
}

const orderSlice = createSlice({
  name: 'order',
  initialState: INITIAL_STATE,
  reducers: {
    addToOrders: (state, action: PayloadAction<ApiItem>) => {
      const item = state.orders.find((item) => item.PKItemID === action.payload.PKItemID)
      if (item) {
        return state.orders.forEach((val) => {
          if (item.PKItemID === val.PKItemID) {
            val.qty++
          }
        })
      }
      state.orders.push({ ...action.payload, qty: 1 })
    },
    removeFrmOrders: (state, action: PayloadAction<string | number>) => {
      state.orders = state.orders.filter((val) => val.PKItemID !== action.payload)
    },
    increment: (state, action) => {
      state.orders.forEach((item) => {
        if (item.PKItemID === action.payload) {
          item.qty++
        }
      })
    },
    decrement: (state, action) => {
      state.orders.forEach((item, index, array) => {
        if (item.PKItemID === action.payload) {
          if (item.qty === 1) {
            array.splice(index, 1)
          }
          item.qty--
        }
      })
    },
    editPrice: (state, action: PayloadAction<{ PKItemID: number; customPrice: number }>) => {
      const { PKItemID, customPrice } = action.payload
      state.orders.forEach((item) => {
        if (item.PKItemID === PKItemID) {
          item.Price = customPrice
        }
      })
    },
    clearOrder: (state) => {
      state.orders = []
      state.totalAmount = 0
    },
    setDiscount: (state, action: PayloadAction<number | string>) => {
      state.discount = Number(action.payload)
    },
    setDiscountOnBlur: (state) => {
      state.discount = (state.discount as number).toFixed(2)
    },
  },
})
export const {
  addToOrders,
  decrement,
  increment,
  clearOrder,
  removeFrmOrders,
  editPrice,
  setDiscount,
  setDiscountOnBlur,
} = orderSlice.actions
export default orderSlice.reducer
