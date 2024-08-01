import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/getUserSlice'
import signupReducer from '../features/users/signupSlice'
import loginReducer from '../features/users/loginSlice';
import blogsReducer from '../features/blogs/blogsSlice'
import createBlogReducer from '../features/blogs/createBlogSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        signup: signupReducer,
        login: loginReducer,
        blogs: blogsReducer,
        createBlog: createBlogReducer
    }
})

export default store