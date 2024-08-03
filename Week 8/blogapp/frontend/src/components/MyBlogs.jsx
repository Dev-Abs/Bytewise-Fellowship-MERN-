import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { likeBlogLocally } from "../features/blogs/blogsSlice";
import { getUser } from "../features/users/getUserSlice";
import { addComment, likeBlog, unlikeBlog } from "../features/blogs/blogsSlice";
import {
  fetchAuthorSpecificBlogs,
  updateBlog,
  setBlogId,
  deleteBlog,
} from "../features/blogs/authorSpecificBlogsSlice";

import { useState } from "react";
import { useNavigate } from "react-router";
import { set } from "mongoose";

const DrawerForm = ({ blogID, show, onClose, toggleSuccess }) => {
  const dispatch = useDispatch();
  const [blogUpdate, setBlogUpdate] = useState({
    title: "",
    categories: "",
    featuredImage: "",
    body: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlogUpdate({
      ...blogUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBlog({ ...blogUpdate, _id: blogID }));
    setBlogUpdate({
      title: "",
      categories: "",
      featuredImage: "",
      body: "",
    });
    navigate("/myblogs");
    onClose();
    toggleSuccess("Blog Updated Successfully");
  };

  return (
    <div
      id="drawer-form"
      className={`fixed top-0 left-0 z-40 h-screen p-6 overflow-y-auto transition-transform ${
        show ? "translate-x-0" : "-translate-x-full"
      } bg-white w-80 md:w-[40%] md:h-[70%] shadow-lg border border-gray-300`}
      tabIndex="-1"
      aria-labelledby="drawer-form-label"
    >
      <h5
        id="drawer-form-label"
        className="mb-6 text-lg font-semibold text-gray-800"
      >
        Update Blog
      </h5>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={blogUpdate.title}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Blog Title"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="categories"
            onChange={handleChange}
            value={blogUpdate.categories}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Blog Category"
            required
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="featuredImage"
            onChange={handleChange}
            value={blogUpdate.featuredImage}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Image URL"
            required
          />
        </div>
        <div>
          <label
            htmlFor="body"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Body
          </label>
          <textarea
            id="body"
            rows="4"
            name="body"
            onChange={handleChange}
            value={blogUpdate.body}
            className="block w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 p-2.5"
            placeholder="Write the blog content..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Update
        </button>
      </form>
    </div>
  );
};


const MyBlogs = ({ toggleSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authorSpecificBlogs, loading, error } = useSelector(
    (state) => state.authorSpecificBlogs
  );

  const sortedBlogs = authorSpecificBlogs.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const user = useSelector((state) => state.user.value);
  const [blogID, setBlogID] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [blogLikes, setBlogLikes] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({});

  useEffect(() => {
    dispatch(fetchAuthorSpecificBlogs());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (authorSpecificBlogs.length === 0) return;
    setBlogLikes(
      authorSpecificBlogs.map((blog) => ({
        blogId: blog._id,
        likes: blog.likes,
      }))
    );

    const initialComments = {};
    authorSpecificBlogs.forEach((blog) => {
      initialComments[blog._id] = blog.comments || [];
    });
    setComments(initialComments);
  }, [authorSpecificBlogs]);

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
    dispatch(unlikeBlog(blogId));
  };

  const handleOpenDrawer = (ID) => () => {
    setBlogID(ID);
    dispatch(setBlogId(ID));
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const deleteBlogHandle = (blogId) => {
    dispatch(deleteBlog(blogId));
    toggleSuccess("Blog Deleted Successfully");
    navigate("/myblogs");
  };

  return (
    <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
      <div className="container">
        <div className="flex flex-wrap justify-center -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[710px]">
              <span className="font-bold text-3xl text-primary block bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
                {user.name ? `${user.name}'s Blogs` : "My Blogs"}
              </span>
            </div>
          </div>
        </div>
        {loading && <div>Loading...</div>}
        {error && (
          <div>
            Error: {error.message || error} Please Reload Or check back later!!
          </div>
        )}
        {sortedBlogs.length > 0 ? (
          <div className="flex flex-wrap -mx-4">
            {sortedBlogs.map((blog) => (
              <div key={blog._id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                              <article className="h-[432px] m-5 custom-scrollbar overflow-auto hover:animate-background hover:bg-[length:400%_400%] hover:[animation-duration:_4s] bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-[3px]  transitionbg-white shadow-lg rounded-lg  transform transition-transform hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/50">
                <div className="relative p-6 ounded-[10px] bg-white !pt-20 sm:p-6 flex flex-col">
                  <span className="absolute top-4 left-4 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {blog.categories || "Unknown Category"}
                  </span>
                  <time
                    dateTime={new Date(blog.createdAt).toISOString()}
                    className="absolute top-4 right-4 bg-indigo-500 text-white text-xs px-2 py-1 rounded"
                  >
                    {new Date(blog.createdAt).toLocaleDateString() + ' ' +  new Date(blog.createdAt).toTimeString().slice(0, 5)}

                  </time>
                  <div className="mt-6 flex items-center gap-x-4">
                      <div>
                        <button
                          type="button"
                          onClick={handleOpenDrawer(blog._id)}
                          className="focus:outline-none text-white bg-gradient-to-r from-green-700 via-green-600 to-green-400 hover:bg-gradient-to-l focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteBlogHandle(blog._id)}
                          className="focus:outline-none text-white bg-gradient-to-r from-red-700 via-red-600 to-red-400 hover:bg-gradient-to-l focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Delete
                        </button>

                      </div>
                    </div>
                  <h2 className="mt-8 text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-300">{blog.title}</h2>
                  <p className="mt-4 text-gray-600">{blog.body}</p>
                  <div className="mt-6 justify-between flex items-center gap-x-4">
                    <button
                      onClick={() => handleLike(blog._id)}
                      className="flex items-center text-indigo-500 hover:text-indigo-700 transition-colors duration-300"
                    >
                      <FaThumbsUp className="mr-1" /> {getLikes(blog._id)}
                    </button>
                    <div className="">
                    <span className="mt-0.5 mr-5 p-2 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-lg ">
                        By {blog.author !== null ? blog.author.name : "Unknown"}
                      </span>
                  </div>
                    </div>

                    <h3 className="mt-6 text-sm font-medium text-gray-800">Comments</h3>
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
                    <input
                      type="text"
                      placeholder="Add a comment"
                      className="mt-4 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment(blog._id, e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                  </article>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[710px]">
            <span className="font-bold text-3xl text-primary block bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
              No Blogs Found
            </span>
          </div>
        )}
      </div>
      <DrawerForm
        blogID={blogID}
        show={drawerOpen}
        onClose={handleCloseDrawer}
        toggleSuccess={toggleSuccess}
      />
    </section>
  );
};

export default MyBlogs;
