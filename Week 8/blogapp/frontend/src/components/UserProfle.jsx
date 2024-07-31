// UserProfile.js
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../features/users/getUserSlice'

const UserProfile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)
    const loading = useSelector((state) => state.user.loading)
    const error = useSelector((state) => state.user.error)

    // useEffect(() => {
    //     dispatch(getUser())
    // }, [dispatch])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h1>User Profile</h1>
            <pre>{JSON.stringify(user)}</pre>
            <button onClick={() => {dispatch(getUser())}}>Get User</button>
        </div>
    )
}

export default UserProfile
