import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";

// ------------Login Api API ---------------
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

// ----------------- Forgot Password API ------------------
export const forgotPasswordApi = createAsyncThunk(
  "forgotPasswordApi",
  async (body) => {
    try {
      const response = await fetch(`${BASE_URL}admin/forgetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      // console.log("Forgot Api", result);
      return result;
    } catch (error) {
      console.log("Forgot Password Api", error.message);
    }
  }
);

// ------------- Verify Code Api -----------------
export const verifyCodeApi = createAsyncThunk("verifyCodeApi", async (body) => {
  try {
    const response = await fetch(`${BASE_URL}admin/verifycode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log("Verify Code Api", result);
    return result;
  } catch (error) {
    console.log("Verify Code Api", error.message);
  }
});

// ------------- New Password/Confirm Password Api -----------------

export const newPasswordApi = createAsyncThunk(
  "newPasswordApi",
  async (body) => {
    const { adminId, password, confirmPassword } = body;

    try {
      const response = await fetch(
        `${BASE_URL}admin/confirmadminpassword/${adminId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            confirmPassword: confirmPassword,
          }),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("New Password/Confirm Password Api", error?.message);
    }
  }
);

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    success: null,
    message: null,
  },
  reducers: {
    // ------- Clear Login Reducer --------
    clearLogin() {
      return {
        isLoading: false,
        data: null,
        isError: false,
        success: null,
        message: null,
      };
    },
    // ------- Clear Forgot Password Reducer --------
    clearForgotPassword() {
      return {
        isLoading: false,
        data: null,
        isError: false,
        success: null,
        message: null,
      };
    },
    // -------- Clear Verify Code Reducer --------
    clearVerifyCode() {
      return {
        isLoading: false,
        data: null,
        isError: false,
        success: null,
        message: null,
      };
    },
    // -------- Clear New Passowrd Reducer --------

    clearNewPassword() {
      return {
        isLoading: false,
        isError: false,
        data: null,
        message: null,
        success: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // ------- LOGIN API REDUCERS ----------
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
        state.message = action.payload?.message || action.error?.message;
        state.success = action.payload?.success || false;
      })
      // ------- FORGOT PASSWORD API REDUCERS ----------
      .addCase(forgotPasswordApi.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.isError = false;
        state.success = null;
        state.message = null;
      })
      .addCase(forgotPasswordApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
        state.isError = false;
        state.success = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(forgotPasswordApi.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload?.message || action.error?.message;
        state.success = action.payload?.success || false;
      })
      // ------- VERIFY CODE API REDUCERS ----------
      .addCase(verifyCodeApi.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.success = null;
        state.message = null;
      })
      .addCase(verifyCodeApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
        state.success = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(verifyCodeApi.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload?.message || action.error?.message;
        state.success = action.payload?.success || false;
      })
      // ------------- New Password/Confirm Password Reducers -----------------
      .addCase(newPasswordApi.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.success = null;
        state.message = null;
        state.isError = false;
      })
      .addCase(newPasswordApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
        state.message = action.payload?.message;
        state.success = action?.payload.success;
        state.isError = false;
      })
      .addCase(newPasswordApi.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload?.message || action.error?.message;
        state.success = action.payload?.success || false;
      });
  },
});
export const {
  clearLogin,
  clearForgotPassword,
  clearVerifyCode,
  clearNewPassword,
} = AuthSlice.actions;
export default AuthSlice.reducer;
