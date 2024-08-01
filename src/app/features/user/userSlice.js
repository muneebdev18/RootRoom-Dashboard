import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
export const blockUserApi = createAsyncThunk("blockUserApi",async(body)=>{
    const adminData = JSON.parse(localStorage.getItem('admin_user'))
    const token = adminData?.token;
    const {id,mutate} = body
    try {
        const response = await fetch(`${BASE_URL}admin/userBlockUnBlock/${id}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        const result = await response.json();
        mutate()
        return result;
    } catch (error) {
        console.log("Block User Api",error?.message)
    }
})
const userSlice = createSlice({
    name:"user",
    initialState:{
        isLoading:false,
        data:null,
        isError:false,
        message:null,
        success:null
    },
    reducers:{
        clearUserBlock(){
            return {
                isLoading:false,
                data:null,
                isError:false,
                message:null,
                success:null
            }
        }
    },
    extraReducers:(builder)=>{
        // --------------- User Block Reducers ----------------
        builder
        .addCase(blockUserApi.pending,(state,action)=>{
            state.isLoading = true;
            state.data = null;
            state.success = null;
            state.message = null;
            state.isError = false;
        })
        .addCase(blockUserApi.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload?.data
            state.message = action.payload?.message;
            state.success = action.payload?.success;
        })
        .addCase(blockUserApi.rejected,(state,action)=>{
            state.isError = true
            state.message = action.payload?.message || action.error?.message
            state.success = action.payload?.success || false;
        })
    }
})
export const {clearUserBlock} = userSlice.actions
export default userSlice.reducer