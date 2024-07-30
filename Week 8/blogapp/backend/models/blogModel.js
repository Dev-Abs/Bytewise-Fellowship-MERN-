const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categories: {
    type: [String]
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      content: {
        type: String,
        required: true
      }
    },
    {
        timestamps: true
    }
  ],
  likes: {
    type: Number,
    default: 0
  },
  featuredImage: {
    type: String
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
//   status: {
//     type: String,
//     enum: ['draft', 'published', 'archived'],
//     default: 'draft'
//   },
//   metaDescription: {
//     type: String
//   },
  readingTime: {
    type: Number
  }
},
{
    timestamps: true // this will add createdAt and updatedAt fields, why? , because we want to know when the goal was created and when it was updated
}
);

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
