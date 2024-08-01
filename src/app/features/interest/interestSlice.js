import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
// ------------ Create Interest Api ----------
export const createInterestApi = createAsyncThunk(
  "createInterestApi",
  async (body) => {
    const adminData = JSON.parse(localStorage.getItem("admin_user"));
    const token = adminData?.token;
    const { mutate } = body;
    try {
      const formData = new FormData();
      formData.append("name", body.name);
      formData.append("file", body.file);
      const response = await fetch(`${BASE_URL}admin/createInterest`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      mutate();
      return result;
    } catch (error) {
      console.log("Create Interest Api", error.message);
    }
  }
);
//  -------------- Edit/Update Interest API --------------------
export const editInterestApi = createAsyncThunk(
  "editInterestApi",
  async (body) => {
    const { mutate, name, file, id } = body;
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      const adminData = JSON.parse(localStorage.getItem("admin_user"));
      const token = adminData?.token;
      const response = await fetch(`${BASE_URL}/admin/updateInterest/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();

      mutate();
      return result;
    } catch (error) {
      console.log("Edit Interest Api", error.message);
    }
  }
);
//  --------- Delete Interest Api --------------------
export const deleteInterestApi = createAsyncThunk(
  "deleteInterestApi",
  async (body) => {
    const adminData = JSON.parse(localStorage.getItem("admin_user"));
    const token = adminData?.token;
    const { id, mutate } = body;
    console.log("API Slice, ID: ", id); // Ensure the ID is logged here
    try {
      const response = await fetch(`${BASE_URL}admin/deleteInterest/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      mutate();
      return result;
    } catch (error) {
      console.log("Delete Interest Api", error.message);
    }
  }
);
// ---------- Interest Slice -------------
const interestSlice = createSlice({
  name: "interestSlice",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
    message: null,
    success: null,
  },
  reducers: {
    clearCreateInterest() {
      return {
        isLoading: false,
        isError: false,
        data: null,
        message: null,
        success: null,
      };
    },
    clearEditInterest() {
      return {
        isLoading: false,
        isError: false,
        data: null,
        message: null,
        success: null,
      };
    },
    clearDeleteInterest() {
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
    // --------- Create Interest Reducer ----------------
    builder
      .addCase(createInterestApi.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.success = null;
        state.message = null;
      })
      .addCase(createInterestApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
        state.message = action.payload?.message;
        state.success = action.payload?.success;
      })
      .addCase(createInterestApi.rejected, (state, action) => {
        state.isError = true;
        state.success = action.payload?.success || false;
        state.message = action.payload?.message || action.error?.message;
      })
      // --------- Edit Interest Reducer ----------------
      .addCase(editInterestApi.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.success = null;
        state.message = null;
      })
      .addCase(editInterestApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
        state.message = action.payload?.message;
        state.success = action.payload?.success;
      })
      .addCase(editInterestApi.rejected, (state, action) => {
        state.isError = true;
        state.success = action.payload?.success || false;
        state.message = action.payload?.message || action.error?.message;
      })
      // --------- Delete Interest Reducer ----------------
      .addCase(deleteInterestApi.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.success = null;
        state.message = null;
      })
      .addCase(deleteInterestApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
        state.message = action.payload?.message;
        state.success = action.payload?.success;
      })
      .addCase(deleteInterestApi.rejected, (state, action) => {
        state.isError = true;
        state.success = action.payload?.success || false;
        state.message = action.payload?.message || action.error?.message;
      });
  },
});
export const { clearCreateInterest, clearEditInterest, clearDeleteInterest } =
  interestSlice.actions;
export default interestSlice.reducer;
