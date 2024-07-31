// signupSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    value: null,
    loading: false,
    error: null,
}

export const signupUser = createAsyncThunk("users/signupUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:5000/api/users", userData, {
            headers: {
                "Content-Type": "application/json",
            }, 
        })
        console.log('response:', response)
        localStorage.setItem('token', response.data.token)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const signupSlice = createSlice({
    name: "signup",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false
                state.value = action.payload
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default signupSlice.reducer
