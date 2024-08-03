// create blog slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createBlog = createAsyncThunk( 'blogs/createBlog', async (blog) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(blog),
    });
    if (!response.ok) {
        throw new Error('Server error');
    }
    return await response.json();
    }
);

const createBlogSlice = createSlice({
    name: 'createBlog',
    initialState: {
        loading: false,
        error: null,
        blog: null,
    },
    extraReducers: (builder) => {
        builder.addCase(createBlog.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.blog = null;
        });
        builder.addCase(createBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.blog = action.payload;
        });
        builder.addCase(createBlog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.blog = null;
        });
    },
});

export default createBlogSlice.reducer;