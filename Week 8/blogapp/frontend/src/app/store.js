import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/getUserSlice'
import signupReducer from '../features/users/signupSlice'
import loginReducer from '../features/users/loginSlice';
import blogsReducer from '../features/blogs/blogsSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        signup: signupReducer,
        login: loginReducer,
        blogs: blogsReducer,
    }
})

export default store