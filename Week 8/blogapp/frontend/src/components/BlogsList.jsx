// BlogList.js
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs, addComment, likeBlog, unlikeBlog } from '../features/blogs/blogsSlice'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

const BlogList = () => {
    const dispatch = useDispatch()
    const { blogs, loading, error } = useSelector((state) => state.blogs)

    useEffect(() => {
        dispatch(fetchBlogs())
    }, [dispatch])

    const handleAddComment = (blogId, content) => {
        dispatch(addComment({ blogId, content }))
    }

    const handleLike = (blogId) => {
        dispatch(likeBlog(blogId))
    }

    const handleUnlike = (blogId) => {
        dispatch(unlikeBlog(blogId))
    }

    return (
        <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
            <div className="container">
                <div className="flex flex-wrap justify-center -mx-4">
                    <div className="w-full px-4">
                        <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                            <span className="font-semibold text-lg text-primary mb-2 block">
                                Our Blogs
                            </span>
                            <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">
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
                    {blogs.map((blog) => (
                        <div key={blog._id} className="w-full md:w-1/2 lg:w-1/3 px-4">
                            <div className="max-w-[370px] mx-auto mb-10">
                                <div className="rounded overflow-hidden mb-8">
                                    <img
                                        src={blog.imageUrl || "https://via.placeholder.com/370"}
                                        alt={blog.title}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <span className="bg-primary rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-white mb-5">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </span>
                                    <h3>
                                        <a
                                            href="#"
                                            className="font-semibold text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-4 inline-block text-dark hover:text-primary"
                                        >
                                            {blog.title}
                                        </a>
                                    </h3>
                                    <p className="text-base text-body-color">
                                        {blog.content}
                                    </p>
                                    <div className="mt-4 flex items-center gap-x-4">
                                        <button onClick={() => handleLike(blog._id)} className="text-gray-600 hover:text-gray-900">
                                        <FaThumbsUp className="mr-1" /> {blog.likes.length} Likes
                                        </button>
                                        <button onClick={() => handleUnlike(blog._id)} className="text-gray-600 hover:text-gray-900">
                                        <FaThumbsDown className="mr-1" /> {blog.unlikes} Unlikes
                                        </button>
                                    </div>
                                    <div className="mt-6 w-full">
                                        <h3 className="text-sm font-medium text-gray-900">Comments</h3>
                                        <div className="mt-2 space-y-4">
                                            {blog.comments.map((comment) => (
                                                <p key={comment._id} className="text-sm text-gray-600">{comment.content}</p>
                                            ))}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Add a comment"
                                            className="mt-2 w-full rounded-md border-gray-300 shadow-sm"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleAddComment(blog._id, e.target.value)
                                                    e.target.value = ''
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BlogList
