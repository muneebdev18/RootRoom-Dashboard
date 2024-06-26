import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    screenSize: window.innerWidth
};

export const screenSizeSlice = createSlice({
    name: 'screen',
    initialState,
    reducers: {
        changeScreenSize: (state, action) => { state.screenSize = action.payload }
    }
});

export const { changeScreenSize } = screenSizeSlice.actions;

// Value of Edit Profile Modal
export const selectScreenSize = (state) => state.screen.screenSize;

export default screenSizeSlice.reducer;