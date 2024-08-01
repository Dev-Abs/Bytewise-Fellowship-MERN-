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
    console.log('data', data);
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

// Slice for authorSpecificBlogs

const authorSpecificBlogsSlice = createSlice({
    name: "authorSpecificBlogs",
    initialState,
    reducers: {
        setBlogId: (state, action) => {
            state.blogId = action.payload
            console.log('Blog ID in slice:', state.blogId);
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
            console.log('Update action payload:', action.payload);
            state.loading = false
            state.authorSpecificBlogs = state.authorSpecificBlogs.map(blog => {
                if (blog._id === action.payload._id) {
                    return action.payload
                }
                return blog
            })
        })
    }
})

export const { setBlogId } = authorSpecificBlogsSlice.actions
export default authorSpecificBlogsSlice.reducer