import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = { modalState: false, qrData: '' }
const componentState = createSlice({
  name: 'components_states',
  initialState: INITIAL_STATE,
  reducers: {
    hideModal: (state) => {
      state.modalState = false
    },
    showModal: (state) => {
      state.modalState = true
    },
    setQrData: (state, action) => {
      state.qrData = action.payload as string
    },
  },
})

export const { hideModal, showModal, setQrData } = componentState.actions
export default componentState.reducer
