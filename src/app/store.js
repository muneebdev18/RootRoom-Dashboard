import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menubar';
import modalReducer from '../features/modal';
import screenSizeReducer from '../features/screenSize';
// import loginSlice from './features/auth/loginSlice';
import AuthSlice from './features/auth/auth'
import LanguageSlice from './features/languages/languageSlice';
import interestSlice from './features/interest/interestSlice';
import adminSlice from './features/admin/adminSlice';
import userSlice from './features/user/userSlice';
// all reducers
const reducer = {
    menu: menuReducer,
    modal: modalReducer,
    screen: screenSizeReducer,
    // AUTH APIS----------------------------------------------------------------
    // login:loginSlice,
    Auth:AuthSlice,
    Langauge:LanguageSlice,
    Interest:interestSlice,
    Admin:adminSlice,
    User:userSlice

}

const store = configureStore({
    reducer: reducer,
    devTools: true
})

export default store;