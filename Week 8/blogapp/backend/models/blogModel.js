const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
}, {
  timestamps: true, // This adds createdAt and updatedAt fields to the comments
});

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  categories: {
    type: [String],
  },
  comments: [CommentSchema], // Use the CommentSchema here
  likes: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
    ],
    default: [],
  },
  featuredImage: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  readingTime: {
    type: Number,
  },
}, {
  timestamps: true, // This adds createdAt and updatedAt fields to the blogs
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
