// slice for implementing api call
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    value: [],
    loading: false,
    error: null,
}

export const getUser = createAsyncThunk("users/getUser", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios({
            method: "GET",
            url: "http://localhost:5000/api/users/profile",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`,
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWE3ZDQwOTQxYmIzYTM2ZWMxM2MwOCIsImlhdCI6MTcyMjQ0OTIxNiwiZXhwIjoxNzI1MDQxMjE2fQ.1MzG2vZCGUo8TYIz-1bqVvIYSOdGC5nNRQSO3ylxszg`,
            },
        })
        // console.log('response:', await response.data.results)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false
                state.value = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default userSlice.reducer
