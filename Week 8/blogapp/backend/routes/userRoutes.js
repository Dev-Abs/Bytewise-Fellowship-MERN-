const express = require('express');
const router = express.Router();

// register,login and get user profile

const {registerUser, loginUser, getUserProfile, getUserById} = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').post(registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/:id').get(getUserById);
// router.route('/profile').get(getUserProfile);


module.exports = router;