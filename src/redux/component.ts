import { createSlice } from '@reduxjs/toolkit'

const componentState = createSlice({
  name: 'components_states',
  initialState: { modalState: false },
  reducers: {
    hideModal: (state) => {
      state.modalState = false
    },
    showModal: (state) => {
      state.modalState = true
    },
  },
})

export const { hideModal, showModal } = componentState.actions
export default componentState.reducer
