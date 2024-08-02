import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Initial state for authorSpecificBlogs
const initialState = {
    authorSpecificBlogs: [],
    loading: false,
    error: null,
    blogId: null
}

// Thunks for asynchronous operations

export const fetchAuthorSpecificBlogs = createAsyncThunk("authorSpecificBlogs/fetchAuthorSpecificBlogs", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:5000/api/blogs/my/blogs", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : { message: error.message })
    }
}
)


// update blog thunk
export const updateBlog = createAsyncThunk("authorSpecificBlogs/updateBlog", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/blogs/${data._id}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : { message: error.message })
    }
})

// delete blog thunk

export const deleteBlog = createAsyncThunk("authorSpecificBlogs/deleteBlog", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : { message: error.message })
    }
})


// Slice for authorSpecificBlogs

const authorSpecificBlogsSlice = createSlice({
    name: "authorSpecificBlogs",
    initialState,
    reducers: {
        setBlogId: (state, action) => {
            state.blogId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuthorSpecificBlogs.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchAuthorSpecificBlogs.fulfilled, (state, action) => {
            state.loading = false
            state.authorSpecificBlogs = action.payload
        })
        builder.addCase(fetchAuthorSpecificBlogs.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
        builder.addCase(updateBlog.fulfilled, (state, action) => {
            state.loading = false
            state.authorSpecificBlogs = state.authorSpecificBlogs.map(blog => {
                if (blog._id === action.payload._id) {
                    return action.payload
                }
                return blog
            })
        })
        builder.addCase(updateBlog.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
        builder.addCase(deleteBlog.fulfilled, (state, action) => {
            state.loading = false
            state.authorSpecificBlogs = state.authorSpecificBlogs.filter(blog => blog._id !== action.payload._id)
        })
        builder.addCase(deleteBlog.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
    }
})

export const { setBlogId } = authorSpecificBlogsSlice.actions
export default authorSpecificBlogsSlice.reducer