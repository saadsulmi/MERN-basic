import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from './adminService'

// Get admin from localStorage
const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
  admin: admin ? admin : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register admin
export const register = createAsyncThunk(
  'auth/register',
  async (admin, thunkAPI) => {
    try {
      return await adminService.register(admin)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login admin
export const adminLogin = createAsyncThunk('adminAuth/adminLogin', async (admin, thunkAPI) => {
  try {
    return await adminService.adminLogin(admin)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const adminLogout = createAsyncThunk('adminAuth/adminLogout', async () => {
  await adminService.adminLogout()
})

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(action.payload.email);
        state.admin = action.payload
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.admin = null
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.admin = null
      })
  },
})

export const { reset } = adminSlice.actions
export default adminSlice.reducer
