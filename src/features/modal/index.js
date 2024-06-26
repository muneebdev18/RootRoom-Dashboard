import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openNoti: true,
    openLogout: false,
    notiModal: false,
    activeModal: false,
    updateProfile: false,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        changeOpenNoti: (state) => { state.openNoti = !state.openNoti },
        changeLogout: (state) => { state.openLogout = !state.openLogout },
        changeNotiModal: (state) => { state.notiModal = !state.notiModal },
        changeActiveModal: (state) => { state.activeModal = !state.activeModal },
        changeUpdateProfile: (state) => { state.updateProfile = !state.updateProfile }
    }
});

export const { changeOpenNoti, changeLogout, changeNotiModal, changeActiveModal, changeUpdateProfile } = modalSlice.actions;

// Value of Edit Profile Modal
export const selectOpenNoti = (state) => state.modal.openNoti;
export const selectLogout = (state) => state.modal.openLogout;
export const selectNotiModal = (state) => state.modal.notiModal;
export const selectActiveModal = (state) => state.modal.activeModal;
export const selectUpdateProfile = (state) => state.modal.updateProfile;

export default modalSlice.reducer;