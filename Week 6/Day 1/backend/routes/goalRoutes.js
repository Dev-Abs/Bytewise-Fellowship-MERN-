const express = require('express');
const router = express.Router();

const {getGoals, postGoals, putGoals, deleteGoals } = require('../controllers/goalController');

// router.get('/', getGoals);

// router.post('/', postGoals);

router.route('/').get(getGoals).post(postGoals);

// router.put('/:id', putGoals);

// router.delete('/:id', deleteGoals);

router.route('/:id').put(putGoals).delete(deleteGoals);


module.exports = router;