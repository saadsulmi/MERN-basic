import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import profileReducer from '../features/profile/profileSlice'
import adminReducer from '../features/adminAuth/adminSlice'
import userReducer from '../features/users/userSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    profile: profileReducer,
    admin : adminReducer,
    user : userReducer
  },
})
