const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc: Register a new user
// @route: POST /api/users
// @access: Public

const registerUser = asyncHandler( async (req, res) => {
    res.json({
        message: 'register'
    })
})

// @desc: Auth user and get token
// @route: POST /api/users/login
// @access: Public

const loginUser = asyncHandler( async (req, res) => {
    res.json({
        message: 'login'
    })
}
)

// @desc: Get user profile
// @route: GET /api/users/profile
// @access: Private

const getUserProfile = asyncHandler( async (req, res) => {
    res.json({
        message: 'profile'
    })
}
)

module.exports = {registerUser, loginUser, getUserProfile}