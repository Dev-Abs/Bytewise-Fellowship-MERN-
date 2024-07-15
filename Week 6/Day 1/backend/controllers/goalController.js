const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
// @desc: Get Goals
// @route: GET /api/goals
// @access: Private
const getGoals = asyncHandler( async (req, res) => { //using async, before getting into the database, becuase it will take some time to get the data
    const goals = await Goal.find({}) //find all the goals    
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
    const goal = new Goal({text: req.body.text})
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
    // await goal.destroy() // not working, becuse we are using mongoose version above 5

    await goal.deleteOne();
    
    res.status(200).json({message: 'Goal removed', id: req.params.id})
})

module.exports = {
    getGoals, postGoals, putGoals, deleteGoals  
}



// install express-async-handler
// because we are using async await in our controller