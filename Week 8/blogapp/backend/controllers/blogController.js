const asyncHandler = require('express-async-handler')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const { validationResult } = require('express-validator')

// blogs controller

// @desc: Get all blogs
// @route: GET /api/blogs
// @access: Public

const getBlogs = asyncHandler(async (req, res) => {  // what will come in request? , nothing, because it is a public route, then how we will get the blogs for the specific author? , we will use populate method to get the author details, why we are using populate method? , because we want to get the author details as well, 
    const blogs = await Blog.find({}).populate('author', 'name email')  // find all the blogs and populate the author field with name and email
    res.json(blogs)
})


// @desc: Get single blog
// @route: GET /api/blogs/:id
// @access: Public

const getBlogById = asyncHandler(async (req, res) => {  // what will come in request? , id, because we are getting a single blog, then how we will get the blog for the specific author? , we will use populate method to get the author details, why we are using populate method? , because we want to get the author details as well,
    const blog = await Blog.findById(req.params.id).populate('author', 'name email')  // find the blog by id and populate the author field with name and email
    if (blog) {
        res.json(blog)
    } else {
        res.status(404)
        throw new Error('Blog not found')
    }
})


// @desc: Create a blog
// @route: POST /api/blogs
// @access: Private

const createBlogPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { title, body, categories, featuredImage} = req.body;
  
    try {
      const slug = title.toLowerCase().split(' ').join('-'); // Simple slug generation
      let blog = await Blog.findOne({ slug });
  
      if (blog) {
        return res.status(400).json({ msg: 'Blog post with this title already exists' });
      }
  
      blog = new Blog({
        title,
        body,
        author: req.user.id,
        categories,
        featuredImage,
        slug,
        readingTime: Math.ceil(body.split(' ').length / 200) // Estimate reading time
      });
  
      await blog.save();
      res.json(blog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


// @desc: Update a blog
// @route: PUT /api/blogs/:id
// @access: Private

const updateBlogPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { title, body, categories, featuredImage } = req.body;
  
    try {
      let blog = await Blog.findById(req.params.id);
  
      if (!blog) {
        return res.status(404).json({ msg: 'Blog post not found' });
      }
  
      if (blog.author.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      const slug = title.toLowerCase().split(' ').join('-');
  
      blog = await Blog.findByIdAndUpdate(
        req.params.id,
        { title, body, categories, featuredImage, slug, readingTime: Math.ceil(body.split(' ').length / 200) },
        { new: true }
      );
  
      res.json(blog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };



// @desc: Delete a blog
// @route: DELETE /api/blogs/:id
// @access: Private

const deleteBlogPost = async (req, res) => {
    try {
      let blog = await Blog.findById(req.params.id);
  
      if (!blog) {
        return res.status(404).json({ msg: 'Blog post not found' });
      }
  
      if (blog.author.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await blog.deleteOne();
      res.json({ msg: 'Blog post removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

  const getMyBlogs = asyncHandler(async (req, res) => {
    console.log('User ID:', req.user._id); // Log user ID
    try {
      const blogs = await Blog.find({ author: req.user._id}).populate('author', 'name email'); // Find all blogs by the logged in user
      res.json(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error); // Log error
      res.status(500).json({ message: error.message });
    }
  });
   


  const addComment = async (req, res) => {
    const { content } = req.body;
  
    try {
      const blog = await Blog.findById(req.params.id);
  
      if (!blog) {
        return res.status(404).json({ msg: 'Blog post not found' });
      }
  
      const newComment = {
        userId: req.user.id,
        content,
        name: req.user.name,
        createdAt: Date.now()
      };
  
      blog.comments.unshift(newComment); // Add new comment to the beginning of the comments array
      await blog.save();
      res.json(blog.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

const likeBlogPost = asyncHandler(async (req, res) => {

    // Find the blog post by ID
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        res.status(404)
        throw new Error('Blog not found')
    }

    // Check if the blog is already liked by the user
    const userLikeIndex = blog.likes.findIndex(like => like.userId.toString() === req.user.id)

    if (userLikeIndex !== -1) {
        // If already liked, remove the like
        blog.likes.splice(userLikeIndex, 1)
    } else {
        // If not liked, add the like
        blog.likes.push({ userId: req.user.id })
    }

    // Save the updated blog
    await blog.save()

    // Respond with the updated likes
    res.json(blog.likes)
})
  

  const unlikeBlogPost = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
  
      if (!blog) {
        return res.status(404).json({ msg: 'Blog post not found' });
      }
  
      // Check if the post has not yet been liked by the user
      if (!blog.likes.some(like => like.userId.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
      }
  
      // Remove the like
      blog.likes = blog.likes.filter(like => like.userId.toString() !== req.user.id);
      await blog.save();
      res.json(blog.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  
  

module.exports = {
    getBlogs,
    getBlogById,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    addComment,
    likeBlogPost,
    unlikeBlogPost,
    getMyBlogs
}
  