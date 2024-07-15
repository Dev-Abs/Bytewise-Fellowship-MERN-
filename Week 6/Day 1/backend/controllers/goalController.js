const asyncHandler = require('express-async-handler')

// @desc: Get Goals
// @route: GET /api/goals
// @access: Private
const getGoals = asyncHandler( async (req, res) => { //using async, before getting into the database, becuase it will take some time to get the data
    res.status(200).json({
        message: 'Get Goals'
    })
})

// @desc: Post Goals
// @route: POST /api/goals
// @access: Private
const postGoals = asyncHandler (async (req, res) => {
    if (!req.body.title) {
        res.status(400)
        throw new Error('Please fill the title')
    }

    res.status(200).json({
        message: 'Post Goals'
    })
})

// @desc: Put Goals by ID
// @route: PUT /api/goals/:id
// @access: Private
const putGoals = asyncHandler (async (req, res) => {
    res.status(200).json({
        message: `Put Goals by ID ${req.params.id}`
    })
})

// @desc: Delete Goals by ID
// @route: DELETE /api/goals/:id
// @access: Private
const deleteGoals = asyncHandler (async (req, res) => {
    res.status(200).json({
        message: `Delete Goals by ID ${req.params.id}`
    })
})

module.exports = {
    getGoals, postGoals, putGoals, deleteGoals  
}



// install express-async-handler
// because we are using async await in our controller