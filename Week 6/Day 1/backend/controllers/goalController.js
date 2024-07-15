// @desc: Get Goals
// @route: GET /api/goals
// @access: Private
const getGoals = (req, res) => {
    res.status(200).json({
        message: 'Get Goals'
    })
}

// @desc: Post Goals
// @route: POST /api/goals
// @access: Private
const postGoals = (req, res) => {
    res.status(200).json({
        message: 'Post Goals'
    })
}

// @desc: Put Goals by ID
// @route: PUT /api/goals/:id
// @access: Private
const putGoals = (req, res) => {
    res.status(200).json({
        message: `Put Goals by ID ${req.params.id}`
    })
}

// @desc: Delete Goals by ID
// @route: DELETE /api/goals/:id
// @access: Private
const deleteGoals = (req, res) => {
    res.status(200).json({
        message: `Delete Goals by ID ${req.params.id}`
    })
}

module.exports = {
    getGoals, postGoals, putGoals, deleteGoals  
}