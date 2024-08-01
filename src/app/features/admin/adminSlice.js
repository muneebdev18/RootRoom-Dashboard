import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";

export const createAdminApi = createAsyncThunk(
    "createAdminApi",
    async (body) => {
      // -------- Local Storage Data ---------
      const adminData = JSON.parse(localStorage.getItem("admin_user"));
      const token = adminData?.token;
      try {
        const response = await fetch(`${BASE_URL}admin/createAdmin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        const result = await response.json();
        return result;
      } catch (error) {
        console.log("Create Admin Api",error?.message);
      }
    }
  );


  export const updateAdminApi = createAsyncThunk(
    "updateAdminApi",
    async (body) => {
      // -------- Local Storage Data ---------
      const adminData = JSON.parse(localStorage.getItem("admin_user"));
      const token = adminData?.token;
      try {
        const formData = new FormData()
        formData.append("fullname",body.fullname)
        formData.append("file",body.file)
        const response = await fetch(`${BASE_URL}admin/adminProfileUpdate`, {
          method: "PUT",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        const result = await response.json();
        return result;
      } catch (error) {
        console.log("Create Admin Api",error?.message);
      }
    }
  );
  export const updateAdminPassword = createAsyncThunk(
    "updateAdminPassword",
    async (body) => {
      // -------- Local Storage Data ---------
      const adminData = JSON.parse(localStorage.getItem("admin_user"));
      const token = adminData?.token;
      try {
        const response = await fetch(`${BASE_URL}admin/adminChangePassword`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        const result = await response.json();
        return result;
      } catch (error) {
        console.log("Chnage Password Admin Api",error?.message);
      }
    }
  );

  

const adminSlice = createSlice({
    name: "adminSlice",
    initialState: {
      isLoading: false,
      isError: false,
      data: null,
      message: null,
      success: null,
    },
    reducers: {
      clearCreateAdmin() {
        return {
          isLoading: false,
          isError: false,
          data: null,
          message: null,
          success: null,
        };
      },
      clearUpdateAdmin() {
        return {
          isLoading: false,
          isError: false,
          data: null,
          message: null,
          success: null,
        };
      },
      clearUpdateAdminPassword() {
        return{
          isLoading: false,
          isError: false,
          data: null,
          message: null,
          success: null,
        }
      }
    },
    extraReducers: (builder) => {
      // --------- Create Interest Reducer ----------------
      builder
        .addCase(createAdminApi.pending, (state) => {
          state.isLoading = true;
          state.data = null;
          state.success = null;
          state.message = null;
        })
        .addCase(createAdminApi.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload?.data;
          state.message = action.payload?.message;
          state.success = action.payload?.success;
        })
        .addCase(createAdminApi.rejected, (state, action) => {
          state.isError = true;
          state.success = action.payload?.success || false;
          state.message = action.payload?.message || action.error?.message;
        })
        .addCase(updateAdminApi?.pending,(state)=>{
          state.isLoading = true;
          state.data = null;
          state.success = null;
          state.message = null;
        })
        .addCase(updateAdminApi?.fulfilled,(state,action)=>{
          state.isLoading = false;
          state.data = action.payload?.data;
          state.message = action.payload?.message;
          state.success = action.payload?.success;
        })
        .addCase(updateAdminApi.rejected,(state,action)=>{
          state.isError = true;
          state.success = action.payload?.success || false;
          state.message = action.payload?.message || action.error?.message;
        })
        .addCase(updateAdminPassword?.pending,(state)=>{
          state.isLoading = true;
          state.data = null;
          state.success = null;
          state.message = null;
        })
        .addCase(updateAdminPassword?.fulfilled,(state,action)=>{
          state.isLoading = false;
          state.data = action.payload?.data;
          state.message = action.payload?.message;
          state.success = action.payload?.success;
        })
        .addCase(updateAdminPassword.rejected,(state,action)=>{
          state.isError = true;
          state.success = action.payload?.success || false;
          state.message = action.payload?.message || action.error?.message;
        })
    },
  });
  export const {clearCreateAdmin,clearUpdateAdmin,clearUpdateAdminPassword} = adminSlice.actions
  export default adminSlice.reducer;
  