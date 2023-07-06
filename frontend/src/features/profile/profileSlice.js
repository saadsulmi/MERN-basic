import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import profileService from './profileService'


const initialState = {
    userProfile : null ,
    isError : false,
    isLoading : false,
    isSuccess:false,
    message:''
}

//get profile of current user
export const getProfile = createAsyncThunk(
    'users/profile',
    async (_,thunkAPI)=>{
        console.log("hai");
        try {
            const token = thunkAPI.getState().auth.user.token
            console.log(token);
            return await profileService.getProfile(token)
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

export const updateProfile = createAsyncThunk(
    'users/update',
    async (data,thunkAPI)=>{
        try {
            console.log(data.image + "where is");
            const token = thunkAPI.getState().auth.user.token
            console.log('token avil'+token);
            return await profileService.updateProfile(data,token)
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

export const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers :{
        reset:( state )=> {
            state.userProfile = null 
            state.isError = false
            state.isLoading = false
            state.isSuccess=false
            state.message=''
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getProfile.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getProfile.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.userProfile = action.payload
            })
            .addCase(getProfile.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message = action.payload
            })
            .addCase(updateProfile.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(updateProfile.fulfilled,(state,action)=>{
                state.userProfile = action.payload
                state.isLoading=false
                state.isSuccess=true
            })
            .addCase(updateProfile.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message = action.payload
            })
    }
})

export const {reset} = profileSlice.actions
export default profileSlice.reducer