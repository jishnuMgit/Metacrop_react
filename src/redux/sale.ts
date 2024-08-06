import Env from '@/config/env'
import { ErrorType } from '@/pages/Error'
import { ApiSalesData } from '@/utils/types'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { asyncApi } from 'useipa'

type InitialState = {
  totalAmount: number
  saleData?: ApiSalesData
  fetching: boolean
  error: ErrorType | null
  touched: boolean // this for any qty changed update data. if changed touched is true.
}
const INITIAL_STATE: InitialState = {
  saleData: undefined,
  totalAmount: 0,
  fetching: false,
  error: null,
  touched: false,
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
      return rejectWithValue((error as { data: ErrorType }).data)
    }
  }
)

const saleSlice = createSlice({
  name: 'sale',
  initialState: INITIAL_STATE,
  reducers: {
    updateSaleData: (
      state,
      action: PayloadAction<{ id: number } & { operation: 'INC' | 'DEC' }>
    ) => {
      state.saleData?.SoldItems.forEach((val) => {
        if (val.PKSoldItemID === action.payload.id) {
          if (action.payload.operation === 'INC') {
            val.Qty++
          }
          if (action.payload.operation === 'DEC') {
            val.Qty--
          }
        }
      })
      state.touched = !!state.saleData?.SoldItems.find(
        (val) => val.oldQty !== val.Qty
      )
    },
    removeSoldItem: (state, action) => {
      state.saleData?.SoldItems.forEach((val) => {
        if (val.FKItemID === action.payload) {
          val.Qty = 0
          state.touched = true
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
        state.touched = false
      })
      .addCase(fetchSale.pending, (state) => {
        state.fetching = true
        state.error = null
      })
      .addCase(fetchSale.rejected, (state, action) => {
        console.log(action.payload, 'fetch error sale')

        state.error = action.payload as ErrorType
      })
  },
})

export const { updateSaleData, removeSoldItem } = saleSlice.actions
export { fetchSale }
export default saleSlice.reducer
