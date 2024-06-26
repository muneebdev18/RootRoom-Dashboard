import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeMenu: false,
    mobileMenu: true
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        changeActiveMenu: (state) => { state.activeMenu = !state.activeMenu },
        changeMobileMenu: (state, action) => { state.mobileMenu = action.payload }
    }
});

export const { changeActiveMenu, changeMobileMenu } = menuSlice.actions;

// Value of Edit Profile Modal
export const selectActiveMenu = (state) => state.menu.activeMenu;
export const selectMobileMenu = (state) => state.menu.mobileMenu;

export default menuSlice.reducer;