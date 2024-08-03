import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  addComment,
  likeBlog,
  unlikeBlog,
} from "../features/blogs/blogsSlice";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { likeBlogLocally } from "../features/blogs/blogsSlice";
import { selectAllLocalBlogs } from "../features/blogs/blogsSlice";
import { getUser } from "../features/users/getUserSlice";

const BlogsList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const localBlogs = useSelector(selectAllLocalBlogs);
  const [blogLikes, setBlogLikes] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({});

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (localBlogs.length === 0) return;
    setBlogLikes(
      localBlogs.map((blog) => ({
        blogId: blog._id,
        likes: blog.likes,
      }))
    );

    const initialComments = {};
    localBlogs.forEach((blog) => {
      initialComments[blog._id] = blog.comments || [];
    });
    setComments(initialComments);
  }, [localBlogs]);

  const handleAddComment = (blogId, content) => {
    dispatch(addComment({ blogId, content }));
    setComments((prevComments) => ({
      ...prevComments,
      [blogId]: [...prevComments[blogId], { userId: user._id, content }],
    }));
    setComment("");
  };

  const getComments = (blogId) => {
    return comments[blogId] || [];
  };

  const handleLike = (blogId) => {
    const updatedBlogLikes = blogLikes.map((blog) => {
      if (blog.blogId === blogId) {
        const alreadyLiked = blog.likes.some(
          (like) => like.userId === user._id
        );
        if (alreadyLiked) {
          return {
            ...blog,
            likes: blog.likes.filter((like) => like.userId !== user._id),
          };
        } else if (user._id && !alreadyLiked) {
          return {
            ...blog,
            likes: [...blog.likes, { userId: user._id }],
          };
        }
      }
      return blog;
    });
    setBlogLikes(updatedBlogLikes);
      dispatch(likeBlog(blogId));
      dispatch(likeBlogLocally(blogId))
  };

  const getLikes = (blogId) => {
    const blog = blogLikes.find((blog) => blog.blogId === blogId);
    return blog ? blog.likes.length : 0;
  };

  const handleUnlike = (blogId) => {
    const updatedBlogLikes = blogLikes.map((blog) => {
      if (blog.blogId === blogId) {
        const alreadyLiked = blog.likes.some(
          (like) => like.userId === user._id
        );
        if (alreadyLiked) {
          return {
            ...blog,
            likes: blog.likes.filter((like) => like.userId !== user._id),
          };
        }
      }
      return blog;
    });
    setBlogLikes(updatedBlogLikes);
    dispatch(unlikeBlog(blogId));
  };

  return (
    <section className="pt-16 pb-24 bg-gray-100">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Our Latest Blogs</h1>
          <p className="text-lg text-gray-600">
            Stay updated with the latest news and insights from our blog.
          </p>
        </header>
        {loading && <div className="text-center text-gray-500">Loading...</div>}
        {error && <div className="text-center text-red-600">Error: {error.message || error}</div>}
        <div className="flex flex-wrap -mx-4">
          {localBlogs.map((blog) => (
            <div key={blog._id} className="w-full  md:w-1/2 lg:w-1/3 px-4 mb-8">
              <article className="h-[432px] m-5 custom-scrollbar overflow-auto hover:animate-background hover:bg-[length:400%_400%] hover:[animation-duration:_4s] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-[3px]  transitionbg-white shadow-lg rounded-lg  transform transition-transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/50">
                <div className="relative p-6 rounded-[10px] bg-white !pt-20 sm:p-6 flex flex-col">
                  <span className="absolute top-4 left-4 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {blog.categories || "Unknown Category"}
                  </span>
                    <span className="self-start p-2 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-lg ">
                        By {blog.author !== null ? blog.author.name : "Unknown"}
                      </span>
                  <time
                    dateTime={new Date(blog.createdAt).toISOString()}
                    className="absolute top-4 right-4 bg-indigo-500 text-white text-xs px-2 py-1 rounded"
                  >
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </time>
                  <h2 className="mt-8 text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-300">{blog.title}</h2>
                  <p className="mt-4 text-gray-600">{blog.body}</p>
                  <div className="mt-6 flex items-center gap-x-4">
                    <button
                      onClick={() => handleLike(blog._id)}
                      className="flex items-center text-indigo-500 hover:text-indigo-700 transition-colors duration-300"
                    >
                      <FaThumbsUp className="mr-1" /> {getLikes(blog._id)}
                    </button>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-800">Comments</h3>
                    <div className="mt-2 space-y-4">
                      {getComments(blog._id).map((comment, index) => (
                        <div key={index} className="flex gap-4 text-sm text-gray-600">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-800">
                              {comment.name || "You"} commented:
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.createdAt).toLocaleDateString() === "Invalid Date"
                                ? "now"
                                : `on ${new Date(comment.createdAt).toLocaleDateString()} at ${new Date(comment.createdAt).toLocaleTimeString()}`
                              }
                            </span>
                          </div>
                          <div>
                            {comment.content}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment"
                      onChange={(e) => 
                        setComment(e.target.value)
                      }
                      className="mt-4 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment(blog._id, e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(blog._id, comment)}
                      className="bg-indigo-500 text-white px-4 mt-4 py-2 rounded hover:bg-indigo-600 transition-colors duration-300"
                    >
                      Add
                    </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsList;
