import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/posts/postSlice'
import userReducer from '../features/users/userSlice'
import notificationReducer from '../features/notifications/NotificationsSlice'
import { apiSlice } from '../features/api/ApiSlice'

export default configureStore({
  reducer: {
    posts : postReducer,
    users : userReducer,
    notifications : notificationReducer,
    // adding RTK query 
    [apiSlice.reducerPath] : apiSlice.reducer
  },
  middleware : getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})
