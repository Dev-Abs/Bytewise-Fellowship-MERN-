import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Initial state for authorSpecificBlogs
const initialState = {
    authorSpecificBlogs: [],
    loading: false,
    error: null,
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

// Slice for authorSpecificBlogs

const authorSpecificBlogsSlice = createSlice({
    name: "authorSpecificBlogs",
    initialState,
    reducers: {},
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
    }
})

export default authorSpecificBlogsSlice.reducer