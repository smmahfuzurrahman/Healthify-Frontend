import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/api";
import notificationReducer from './features/notificationSlice';
export const store = configureStore({
  reducer: {
    // Add your reducers here
    [baseApi.reducerPath]: baseApi.reducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

