const express = require('express');
const router = express.Router();

// register,login and get user profile

const {registerUser, loginUser, getUserProfile} = require('../controllers/userController');

router.route('/').post(registerUser);
router.post('/login', loginUser);
router.route('/profile').get(getUserProfile);


module.exports = router;