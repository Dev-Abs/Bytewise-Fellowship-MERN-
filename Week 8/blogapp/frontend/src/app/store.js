import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/getUserSlice'
import signupReducer from '../features/users/signupSlice'
import loginReducer from '../features/users/loginSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        signup: signupReducer,
        login: loginReducer,
    }
})

export default store