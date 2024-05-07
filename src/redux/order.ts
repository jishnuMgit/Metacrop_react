import { createSlice } from '@reduxjs/toolkit'
import { ProductType } from '../db'

type InitialState = { orders: ProductType[]; totalAmount: number }
const INITIAL_STATE: InitialState = {
  orders: [],
  totalAmount: 0,
}

const orderSlice = createSlice({
  name: 'order',
  initialState: INITIAL_STATE,
  reducers: {
    addToOrders: (state, action) => {
      if (state.orders.find((item) => item.id === action.payload.id)) {
        return
      }
      state.orders.push(action.payload)
    },
    increment: (state, action) => {
      state.orders.forEach((item) => {
        if (item.id === action.payload) {
          item.qty++
        }
      })
    },
    decrement: (state, action) => {
      state.orders.forEach((item, index, array) => {
        if (item.id === action.payload) {
          if (item.qty === 1) {
            array.splice(index, 1)
          }
          item.qty--
        }
      })
    },
    clearOrder: (state) => {
      state.orders = []
      state.totalAmount = 0
    },
  },
})
export const { addToOrders, decrement, increment, clearOrder } =
  orderSlice.actions
export default orderSlice.reducer
