import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogDetails = ({ blog, expanded, handleLike, removeBlog, own }) => {
  if (!expanded) return null

  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'

  return (
    <div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={() => handleLike(blog)}>like</button>
      </div>
      {addedBy}
      {own&&<button onClick={() => removeBlog(blog.id)}>
        remove
      </button>}
    </div>
  )
}

const Blog = ({ blog, handleLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expanded, setExpanded] = useState(false)
  if(!blog) {
    return null
  }

  return (
    <div style={blogStyle}>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>  {blog.author}

        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'hide' : 'view'}
        </button>
        <BlogDetails
          blog={blog}
          expanded={expanded}
          handleLike={handleLike}
          removeBlog={removeBlog}
          own={blog.user && user.username === blog.user.username}
        />
      </div>
    </div>
  )
}

export default Blog