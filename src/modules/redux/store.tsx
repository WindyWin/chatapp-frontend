import { configureStore } from '@reduxjs/toolkit'
// ...
import userReducer from './authSlice'
import conversationReducer from './conversationSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        conversations: conversationReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;