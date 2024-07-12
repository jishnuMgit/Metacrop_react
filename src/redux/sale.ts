import Env from '@/config/env'
import { ApiSalesData } from '@/utils/types'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { asyncApi } from 'useipa'

type InitialState = {
  totalAmount: number
  saleData?: ApiSalesData
  fetching: boolean
  error: Error | null | object
  updateData?: { sold_items: []; TotalAmount: number }
}
const INITIAL_STATE: InitialState = {
  saleData: undefined,
  totalAmount: 0,
  fetching: false,
  error: null,
  updateData: undefined,
}
const fetchSale = createAsyncThunk(
  'sale/fetchsale',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await asyncApi<{ data?: ApiSalesData }>(
        `${Env.VITE_BASE_URL}/sales/${id}`,
        'GET',
        {
          withCredentials: true,
        }
      )
      if (data) {
        data.SoldItems = data.SoldItems.map((val) => ({
          ...val,
          oldQty: val.Qty,
        }))
        return data
      }
    } catch (error) {
      return rejectWithValue('failed to fetch')
    }
  }
)

const saleSlice = createSlice({
  name: 'sale',
  initialState: INITIAL_STATE,
  reducers: {
    updateSaleData: (
      state,
      action: PayloadAction<
        { PKSoldItemID: number } & { operation: 'INC' | 'DEC' }
      >
    ) => {
      state.saleData?.SoldItems.forEach((val) => {
        if (val.PKSoldItemID === action.payload.PKSoldItemID) {
          if (action.payload.operation === 'INC') {
            val.Qty++
          }
          if (action.payload.operation === 'DEC') {
            val.Qty--
          }
        }
      })
    },
    removeSoldItem: (state, action) => {
      state.saleData?.SoldItems.forEach((val) => {
        if (val.FKItemID === action.payload) {
          val.Qty = 0
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSale.fulfilled, (state, action) => {
        console.log(action.payload, 'payload')
        state.fetching = false
        state.saleData = action.payload
      })
      .addCase(fetchSale.pending, (state) => {
        state.fetching = true
        state.error = null
      })
      .addCase(fetchSale.rejected, (state, action) => {
        state.error = action.payload as Error
      })
  },
})

export const { updateSaleData, removeSoldItem } = saleSlice.actions
export { fetchSale }
export default saleSlice.reducer
