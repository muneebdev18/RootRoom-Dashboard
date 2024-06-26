import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menubar';
import modalReducer from '../features/modal';
import screenSizeReducer from '../features/screenSize';
import loginSlice from './features/auth/loginSlice';
// all reducers
const reducer = {
    menu: menuReducer,
    modal: modalReducer,
    screen: screenSizeReducer,
    // AUTH APIS----------------------------------------------------------------
    login:loginSlice
}

const store = configureStore({
    reducer: reducer,
    devTools: true
})

export default store;