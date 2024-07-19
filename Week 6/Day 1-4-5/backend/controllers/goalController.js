const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')
// @desc: Get Goals
// @route: GET /api/goals
// @access: Private
const getGoals = asyncHandler( async (req, res) => { //using async, before getting into the database, becuase it will take some time to get the data
    const goals = await Goal.find({ user: req.user.id }) //find all the goals    
        res.status(200).json(goals) //send the goals in json format
})

// @desc: Post Goals
// @route: POST /api/goals
// @access: Private
const postGoals = asyncHandler (async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text field')
    }
    const goal = new Goal({
        text: req.body.text,
        user: req.user.id
    })
    const createdGoal = await goal.save()
    res.status(200).json(createdGoal)
})

// @desc: Put Goals by ID
// @route: PUT /api/goals/:id
// @access: Private
const putGoals = asyncHandler (async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    // Make sure user is goal owner, logged in user matches the user who created the goal (goal user)
    if (goal.user.toString() !== req.user.id) { // goal.user is an object, so we need to convert it to string, why we are using goal.user and how? , because we have user field in goal model
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json(updatedGoal)
})

// @desc: Delete Goals by ID
// @route: DELETE /api/goals/:id
// @access: Private
const deleteGoals = asyncHandler (async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    
    // Get user
    const user = await User.findById(req.user.id)

    // check for user
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    // Make sure user is goal owner, logged in user matches the user who created the goal (goal user)
    if (goal.user.toString() !== req.user.id) { // goal.user is an object, so we need to convert it to string, why we are using goal.user and how? , because we have user field in goal model
        res.status(401)
        throw new Error('User not authorized')
    }

    // await goal.destroy() // not working, becuse we are using mongoose version above 5
    await goal.deleteOne();
    
    res.status(200).json({message: 'Goal removed', id: req.params.id})
})

module.exports = {
    getGoals, postGoals, putGoals, deleteGoals  
}



// install express-async-handler
// because we are using async await in our controller