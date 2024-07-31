// Signup.js
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../features/users/signupSlice'

const Signup = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { loading, error, value } = useSelector((state) => state.signup)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('formdata:' ,formData)
        dispatch(signupUser(formData))
    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Signup</button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {value && <div>Signup successful!</div>}
        </div>
    )
}

export default Signup
