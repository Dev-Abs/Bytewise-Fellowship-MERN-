// Login.js
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/users/loginSlice'

const Login = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { loading, error, user } = useSelector((state) => state.login)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(formData))
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {user && <div>Logged In</div>}
        </div>
    )
}

export default Login
