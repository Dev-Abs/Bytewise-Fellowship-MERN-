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
    blogUpdate.title = "";
    blogUpdate.categories = "";
    blogUpdate.featuredImage = "";
    blogUpdate.body = "";
    navigate("/myblogs");
    onClose();
    toggleSuccess("Blog Updated Successfully");
  };
  return (
    <div
      id="drawer-form"
      className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
        show ? "translate-x-0" : "-translate-x-full"
      } bg-white w-80 md:w-[40%] md:h-[70%] dark:bg-gray-800 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg`}
      tabIndex="-1"
      aria-labelledby="drawer-form-label"
    >
      <h5
        id="drawer-form-label"
        className="inline-flex items-center mb-6 text-base font-semibold text-black uppercase"
      >
        Update Blog
      </h5>
      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          className="w-3 h-3"
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
      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-black"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={blogUpdate.title}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            placeholder="Blog Title"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-black"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="categories"
            onChange={handleChange}
            value={blogUpdate.categories}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            placeholder="Blog Category"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-black"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="featuredImage"
            onChange={handleChange}
            value={blogUpdate.featuredImage}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Image URL"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="body"
            className="block mb-2 text-sm font-medium text-black"
          >
            Body
          </label>
          <textarea
            id="body"
            rows="4"
            name="body"
            onChange={handleChange}
            value={blogUpdate.body}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
            placeholder="Write the blog content..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-green-700 via-green-600 to-green-400 hover:bg-gradient-to-l justify-center flex items-center w-full font-medium rounded-lg text-sm px-5 py-2.5 mb-2 d focus:outline-none "
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
        {authorSpecificBlogs.length > 0 ? (
          <div className="flex flex-wrap -mx-4">
            {authorSpecificBlogs.map((blog) => (
              <div
                key={blog._id}
                className="w-full md:w-1/2 lg:w-1/3 px-4 mt-2"
              >
                <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-[3px] shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
                  <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6 flex flex-col">
                    <span className="self-start mb-6 relative top-0 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {blog.categories || "Unknown Category"}
                    </span>
                    <div className="flex items-center justify-between">
                      <time
                        dateTime={new Date(blog.createdAt).toISOString()}
                        className="self-start inline-block bg-gradient-to-r from-teal-400 to-blue-500 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </time>
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
                      <span className="mt-0.5 mr-5 p-2 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-lg ">
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
                            {" "}
                            on {new Date(comment.createdAt).toLocaleDateString()} at{" "} {new Date(comment.createdAt).toLocaleTimeString()}{" "}
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
