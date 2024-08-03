const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// @desc: Register a new user
// @route: POST /api/users
// @access: Public

const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc: Auth user and get token
// @route: POST /api/users/login
// @access: Public

const loginUser = asyncHandler( async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    //check for user email
    const user = await User.findOne({email})

    if (!user) {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    })

    // if (user && (await bcrypt.compare(password, user.password))) {
    //     res.json({
    //         _id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         token: null
    //     })
    // } else {
    //     res.status(401)
    //     throw new Error('Invalid email or password')
    // }

}
)

// @desc: Get user profile
// @route: GET /api/users/profile
// @access: Private

const getUserProfile = asyncHandler( async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id) // req.user is set in the protect middleware

    if (_id) {
        res.json({
            _id,
            name,
            email
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
}
)

const getUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
}
)

// Generate JWT 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {registerUser, loginUser, getUserProfile, getUserById}