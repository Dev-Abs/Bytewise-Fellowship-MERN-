const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, createBlogPost, updateBlogPost, deleteBlogPost} = require('../controllers/blogController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getBlogs).post(protect, createBlogPost);
router.route('/:id').get(getBlogById).put(protect, updateBlogPost).delete(protect, deleteBlogPost);

module.exports = router;