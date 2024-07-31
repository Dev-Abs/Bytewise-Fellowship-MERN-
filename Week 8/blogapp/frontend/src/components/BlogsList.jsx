// BlogList.js
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs, addComment, likeBlog, unlikeBlog } from '../features/blogs/blogsSlice'

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
        <div>
            <h1>Blog List</h1>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message || error}</div>}
            {blogs.map((blog) => (
                <div key={blog._id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                    <div>
                        <button onClick={() => handleLike(blog._id)}>Like</button>
                        <button onClick={() => handleUnlike(blog._id)}>Unlike</button>
                    </div>
                    <div>
                        <h3>Comments</h3>
                        {blog.comments.map((comment) => (
                            <p key={comment._id}>{comment.text}</p>
                        ))}
                        <input type="text" placeholder="Add a comment" onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAddComment(blog._id, e.target.value)
                                e.target.value = ''
                            }
                        }} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BlogList
