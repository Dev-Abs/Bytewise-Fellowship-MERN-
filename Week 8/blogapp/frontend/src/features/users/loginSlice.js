// login slice

// loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    user: null,
    loading: false,
    error: null,
}

export const loginUser = createAsyncThunk("users/loginUser", async (loginData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`, loginData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        localStorage.setItem('token', response.data.token)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : { message: error.message })
    }
})

const loginSlice = createSlice({
    name: "login",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default loginSlice.reducer
