import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { likeBlogLocally } from '../features/blogs/blogsSlice';
import { fetchBlogs, addComment, likeBlog, unlikeBlog } from '../features/blogs/blogsSlice';
import { fetchAuthorSpecificBlogs } from '../features/blogs/authorSpecificBlogsSlice';

const MyBlogs = () => {
  const dispatch = useDispatch();
  const { authorSpecificBlogs, loading, error } = useSelector((state) => state.authorSpecificBlogs);

  useEffect(() => {
    dispatch(fetchAuthorSpecificBlogs());
  }, [dispatch]);

  const handleAddComment = (blogId, content) => {
    dispatch(addComment({ blogId, content }));
  };

  const handleLike = (blogId) => {
    dispatch(likeBlog(blogId));
    dispatch(likeBlogLocally(blogId));
  };

  const handleUnlike = (blogId) => {
    dispatch(unlikeBlog(blogId));
  };

  return (
    <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
      <div className="container">
        <div className="flex flex-wrap justify-center -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
              <span className="font-bold text-3xl text-primary mb-2 block bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
                Your Blogs
              </span>
            </div>
          </div>
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message || error}</div>}
        <div className="flex flex-wrap -mx-4">
          {authorSpecificBlogs.map((blog) => (
            <div key={blog._id} className="w-full md:w-1/2 lg:w-1/3 px-4 mt-2">
              <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-[3px] shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
                <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6 flex flex-col">
                  <span className="self-start mb-6 relative top-0 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {blog.categories || 'Unknown Category'}
                  </span>
                  <time dateTime={new Date(blog.createdAt).toISOString()} className="self-start inline-block bg-gradient-to-r from-teal-400 to-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </time>
                  <a className="flex items-center justify-between" href="#">
                    <h2 className="mt-1 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 flex items-center">
                      <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {blog.title}
                    </h2>
                    <span className="mt-0.5 mr-5 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                      {blog.author !== null ? blog.author.name : 'Unknown'}
                    </span>
                  </a>
                  <p className="text-base text-body-color">{blog.body}</p>
                  <div className="mt-4 flex items-center gap-x-4">
                    <button onClick={() => handleLike(blog._id)} className="flex items-center text-gray-600 hover:text-gray-900">
                      <FaThumbsUp className="mr-1" /> {blog.likes.length}
                    </button>
                    <button onClick={() => handleUnlike(blog._id)} className="flex items-center text-gray-600 hover:text-gray-900">
                      <FaThumbsDown className="mr-1" />
                    </button>
                  </div>
                  <div className="mt-6 w-full">
                    <h3 className="text-sm font-medium text-gray-900">Comments</h3>
                    <div className="mt-2 space-y-4">
                      {blog.comments.map((comment) => (
                        <p key={comment._id} className="text-sm text-gray-600">
                          <span className="font-bold text-gray-600">{comment.name || 'Unknown'} commented:</span> {comment.content}
                        </p>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add a comment"
                      className="mt-2 w-full rounded-md border-gray-300 shadow-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(blog._id, e.target.value);
                          e.target.value = '';
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

export default MyBlogs;
