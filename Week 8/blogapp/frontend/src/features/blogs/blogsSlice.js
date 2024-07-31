// blogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Initial state for blogs
const initialState = {
    blogs: [],
    loading: false,
    error: null,
}

// Thunks for asynchronous operations
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:5000/api/blogs")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : { message: error.message })
    }
})

export const addComment = createAsyncThunk("blogs/addComment", async ({ blogId, content }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/blogs/${blogId}/comment`, { content }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : { message: error.message })
    }
})

export const likeBlog = createAsyncThunk("blogs/likeBlog", async (blogId, { rejectWithValue }) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/blogs/${blogId}/like`, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : { message: error.message })
    }
})

export const unlikeBlog = createAsyncThunk("blogs/unlikeBlog", async (blogId, { rejectWithValue }) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/blogs/${blogId}/unlike`, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : { message: error.message })
    }
})

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    extraReducers: (builder) => {
        builder
            // Fetch Blogs
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false
                state.blogs = action.payload
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Add Comment
            .addCase(addComment.fulfilled, (state, action) => {
                const blogIndex = state.blogs.findIndex(blog => blog._id === action.payload.blogId)
                if (blogIndex >= 0) {
                    state.blogs[blogIndex].comments.push(action.payload.comment)
                }
            })
            .addCase(addComment.rejected, (state, action) => {
                state.error = action.payload
            })
            // Like Blog
            .addCase(likeBlog.fulfilled, (state, action) => {
                const blogIndex = state.blogs.findIndex(blog => blog._id === action.payload._id)
                if (blogIndex >= 0) {
                    state.blogs[blogIndex] = action.payload
                }
            })
            .addCase(likeBlog.rejected, (state, action) => {
                state.error = action.payload
            })
            // Unlike Blog
            .addCase(unlikeBlog.fulfilled, (state, action) => {
                const blogIndex = state.blogs.findIndex(blog => blog._id === action.payload._id)
                if (blogIndex >= 0) {
                    state.blogs[blogIndex] = action.payload
                }
            })
            .addCase(unlikeBlog.rejected, (state, action) => {
                state.error = action.payload
            })
    },
})

export default blogSlice.reducer
