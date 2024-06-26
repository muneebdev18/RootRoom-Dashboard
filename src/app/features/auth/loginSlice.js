import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
export const loginApi = createAsyncThunk("loginApi", async (body) => {
  try {
    const response = await fetch(`${BASE_URL}admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (result?.success) {
      localStorage.setItem("admin_user", JSON.stringify(result?.data));
    }
    if (response.ok) {
      return result;
    } else {
      throw new Error(result?.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    success: null,
    message: null,
    errorMessage: "",
  },
  reducers: {
    clearLogin() {
      return {
        isLoading: false,
        data: null,
        isError: false,
        success: null,
        message: null,
        errorMessage: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.isError = false;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
        state.isError = false;
        state.success = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.success = false;
        state.errorMessage = action.error?.message;
      });
  },
});
export const { clearLogin } = loginSlice.actions;
export default loginSlice.reducer;
