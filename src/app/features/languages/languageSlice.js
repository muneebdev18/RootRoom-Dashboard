import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";

// ------ Create Language API ----------
export const createLanguageApi = createAsyncThunk(
  "createLanguageApi",
  async (body, { rejectWithValue }) => {
    // -------- Local Storage Data ---------
    const adminData = JSON.parse(localStorage.getItem("admin_user"));
    const token = adminData?.token;
    try {
      const response = await fetch(`${BASE_URL}admin/createLanguage`, {
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
      console.log("Create Language Api", error?.message);
    }
  }
);

//  ----------- Edit/Update Language API -----------
export const editLanguageApi = createAsyncThunk(
  "editLanguageApi",
  async (body) => {
    const { id, name, mutate } = body;
    try {
      // -------- Local Storage Data ---------
      const adminData = JSON.parse(localStorage.getItem("admin_user"));
      const token = adminData?.token;
      const response = await fetch(`${BASE_URL}admin/updateLanguage/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      const result = await response.json();
      mutate();
      return result;
    } catch (error) {
      console.log("Edit Language Api", error.message);
    }
  }
);

//  ---------- Delete Language API --------

export const deleteLanguageApi = createAsyncThunk(
  "deleteLanguageApi",
  async(body) => {
    const {id,mutate} = body;
    try {
      // -------- Local Storage Data ---------
      const adminData = JSON.parse(localStorage.getItem("admin_user"));
      const token = adminData?.token;
      const response = await fetch(`${BASE_URL}admin/deleteLanguage/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      mutate()
      return result;
    } catch (error) {
      console.log("Delete Language Api", error.message);
    }
  }
);
const LanguageSlice = createSlice({
  name: "LanguageSlice",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
    message: null,
    success: null,
  },
  reducers: {
    clearCreateLanguage() {
      return {
        isLoading: false,
        isError: false,
        data: null,
        message: null,
        success: null,
      };
    },
    clearEditLanguage() {
      return {
        isLoading: false,
        isError: false,
        data: null,
        message: null,
        success: null,
      };
    },
    clearDeleteLanguage() {
      return {
        isLoading: false,
        isError: false,
        data: null,
        message: null,
        success: null,
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // -------- Create language Reducer --------------------
      .addCase(createLanguageApi.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.isError = false;
        state.message = null;
        state.success = null;
      })
      .addCase(createLanguageApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
        state.message = action.payload?.message;
        state.success = action.payload?.success;
      })
      .addCase(createLanguageApi.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload?.message || action.error.message;
        state.success = action.payload?.success || false;
      })
      // -------- Edit language Reducer --------------------

      .addCase(editLanguageApi.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.isError = false;
        state.message = null;
        state.success = null;
      })
      .addCase(editLanguageApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
        state.success = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(editLanguageApi.rejected, (state, action) => {
        state.isError = true;
        state.success = action.payload?.success || false;
        state.message = action.payload?.message || action.error.message;
      })
      // -------- Delete language Reducer --------------------
      .addCase(deleteLanguageApi.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.success = null;
        state.message = null;
      })
      .addCase(deleteLanguageApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
        state.message = action.payload?.message;
        state.success = action.payload?.success;
      })
      .addCase(deleteLanguageApi.rejected, (state, action) => {
        state.isError = true;
        state.success = action.payload?.success || false;
        state.message = action.payload?.message || action.error.message;
      });
  },
});
export const { clearCreateLanguage, clearEditLanguage,clearDeleteLanguage } = LanguageSlice.actions;
export default LanguageSlice.reducer;
