import { ApiItem } from '@/utils/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = { orders: ApiItem[]; totalAmount: number; discount?: number | string }
const INITIAL_STATE: InitialState = {
  orders: [],
  //Initially set discount is empty string
  discount: '',
  totalAmount: 0,
}
/**
 * Order slice for create sales
 */
const orderSlice = createSlice({
  name: 'order',
  initialState: INITIAL_STATE,
  reducers: {
    addToOrders: (state, action: PayloadAction<ApiItem>) => {
      const item = state.orders.find((item) => item.PKItemID === action.payload.PKItemID)
      console.log('item : ', state.orders)
      if (item) {
        return state.orders.forEach((val) => {
          if (item.PKItemID === val.PKItemID) {
            val.qty++
          }
        })
      }
      state.orders.push({ ...action.payload, qty: 1 })
    },

    // Remove Item from order slice with PKItemID.
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
    // decrement item qty. if item qty is equal to 1, remove item from order slice
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
    // Initially item have fixed price from db. but you can edit price
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
      state.discount = ''
    },
    setDiscount: (state, action: PayloadAction<number | string>) => {
      state.discount = Number(action.payload)
    },
    // onBlur event. set to decimal point to discount. eg: 20 is 20.00 or 20.983674 is 20.98
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
