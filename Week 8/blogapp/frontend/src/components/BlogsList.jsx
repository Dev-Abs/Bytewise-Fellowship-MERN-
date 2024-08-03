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
        } else {
          return {
            ...blog,
            likes: [...blog.likes, { userId: user._id }],
          };
        }
      }
      return blog;
    });
    setBlogLikes(updatedBlogLikes);
    if (
      updatedBlogLikes
        .find((blog) => blog.blogId === blogId)
        .likes.some((like) => like.userId === user._id)
    ) {
      dispatch(likeBlog(blogId));
      dispatch(likeBlogLocally(blogId));
    } else {
      dispatch(unlikeBlog(blogId));
    }
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
    <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
      <div className="container">
        <div className="flex flex-wrap justify-center -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
              <span className="font-bold text-3xl text-primary mb-2 block bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
                Our Blogs
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                Our Recent News
              </h2>
              <p className="text-base text-body-color">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message || error}</div>}
        <div className="flex flex-wrap -mx-4">
          {localBlogs.map((blog) => (
            <div key={blog._id} className="w-full md:w-1/2 lg:w-1/3 px-4 mt-2">
              <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-[3px] shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
                <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6 flex flex-col">
                  <span className="self-start mb-6 relative top-0 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {blog.categories || "Unknown Category"}
                  </span>
                  <time
                    dateTime={new Date(blog.createdAt).toISOString()}
                    className="self-start inline-block bg-gradient-to-r from-teal-400 to-blue-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </time>
                  <a className="flex items-center justify-between" href="#">
                    <h2 className="mt-1 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 flex items-center">
                      <svg
                        className="w-6 h-6 mr-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {blog.title}
                    </h2>
                    <span className="mt-0.5 mr-5 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                      {blog.author !== null ? blog.author.name : "Unknown"}
                    </span>
                  </a>
                  <p className="text-base text-body-color">{blog.body}</p>
                  <div className="mt-4 flex items-center gap-x-4">
                    <button
                      onClick={() => handleLike(blog._id)}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <FaThumbsUp className="mr-1" /> {getLikes(blog._id)}
                    </button>
                    <button
                      onClick={() => handleUnlike(blog._id)}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <FaThumbsDown className="mr-1" />
                    </button>
                  </div>
                  <div className="mt-6 w-full">
                    <h3 className="text-sm font-medium text-gray-900">
                      Comments
                    </h3>
                    <div className="mt-2 space-y-4">
                      {getComments(blog._id).map((comment, index) => (
                        <p key={index} className="flex gap-4 text-sm text-gray-600">
                          <div className="flex flex-col">
                          <span className="font-bold text-gray-600">
                            {comment.name || "you commented"} commented:
                          </span>
                          <span className="justify-end text-xs text-gray-400">
                            {/* if Invalid Date Show 'now */}
                            {new Date(comment.createdAt).toLocaleDateString() === "Invalid Date" ? "now" 
                            : `on ${new Date(comment.createdAt).toLocaleDateString()} at ${''} ${new Date(comment.createdAt).toLocaleTimeString()}${''}`
                            }{" "}
                          </span>
                          </div>
                          {" "}
                          <div className="">
                          {comment.content} 
                          </div>
                        </p>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add a comment"
                      className="mt-2 w-full rounded-md border-gray-300 shadow-sm"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment(blog._id, e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
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
