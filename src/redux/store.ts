import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './order'
import componentState from './component'
import saleReducer from './sale'
import returnItemReducer from './returnItem'

export const store = configureStore({
  reducer: {
    order: orderReducer,
    uiState: componentState,
    sale: saleReducer,
    returnItem: returnItemReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
