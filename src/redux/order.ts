import { PayloadAction, createSlice } from '@reduxjs/toolkit'
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
    addToOrders: (state, action: PayloadAction<ProductType>) => {
      const item = state.orders.find(
        (item) => item.PKItemID === action.payload.PKItemID
      )
      if (item) {
        return state.orders.forEach((val) => {
          if (item.PKItemID === val.PKItemID) {
            val.qty++
          }
        })
      }
      state.orders.push({ ...action.payload, qty: 1 })
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
    clearOrder: (state) => {
      state.orders = []
      state.totalAmount = 0
    },
  },
})
export const { addToOrders, decrement, increment, clearOrder } =
  orderSlice.actions
export default orderSlice.reducer
