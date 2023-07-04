import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
    users: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }



//user data fetch

export const fetchUsers= createAsyncThunk(
    'admin/userdata',
    async (_,thunkAPI)=>{
        try {
            const token = thunkAPI.getState().admin.admin.token
            return await userService.fetchUsers(token)
        } catch (error) {
           const message= (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


//block user 

export const blockUser = createAsyncThunk(
    'admin/blockuser',
    async (uid,thunkAPI)=>{
        console.log(uid);
        try {
            const token = thunkAPI.getState().admin.admin.token
            return await userService.blockUser(uid,token)
        } catch (error) {
           const message= (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        adminReset: (state)=> initialState
    },
    extraReducers : (builder)=>{
        builder
            .addCase(fetchUsers.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(fetchUsers.fulfilled,(state,action)=>{
                state.isSuccess =true
                state.isLoading = false
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected,(state,action)=>{
                state.isLoading = false
                state.isError=true
                state.message = action.payload
            })
            .addCase(blockUser.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(blockUser.fulfilled,(state,action)=>{
                state.isSuccess =true
                state.isLoading = false
                state.users = action.payload
            })
            .addCase(blockUser.rejected,(state,action)=>{
                state.isLoading = false
                state.isError=true
                state.message = action.payload
            })
    }
})

export const { reset } = userSlice.actions
export default userSlice.reducer