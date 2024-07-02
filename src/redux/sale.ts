// import { ApiSalesData } from '@/utils/types'
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { asyncApi } from 'useipa'

// type InitialState = undefined | ApiSalesData
// const INITIAL_STATE: ApiSalesData = undefined
// const fetchSale = createAsyncThunk(
//   'sale/fetchSale',
//   async ({ id }: { id: string }) => {
//     const result = await asyncApi(`/sales/${id}`)
//   }
// )
// const saleSlice = createSlice({
//   name: 'sale',
//   initialState: INITIAL_STATE,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchSale.fulfilled, (state, action) => {
//       state = action.payload
//     })
//   },
// })
