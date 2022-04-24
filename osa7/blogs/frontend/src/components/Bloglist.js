import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import styled from 'styled-components'
import Notification from './Notification'
import { useState } from 'react'

export const Container = styled.div`
    margin: auto;
    background: white;
    width: 50%;
    padding: 5vh;
    border-radius: 7px;
    box-shadow: 0 16px 24px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
`
const Header = styled.div`
    font-size: 2.5em;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    padding: 2vh;
    text-align: center;
`
export const ListItem = styled.div`
    background: Ghostwhite;
    padding: 1vh;
    border: solid;
    margin-bottom: 3px;
    font-size: 1.25em;
`

const Bloglist = ({ user, setBlogs, blogs }) => {
    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(false)
    if (!user) {
        return null
    }
    const notificationTimeout = () => {
        setTimeout(() => {
            setMessage(null)
            setIsError(false)
        }, 5000)
    }

    const addBlog = async (blogObject) => {
        try {
            const blog = await blogService.addBlog(blogObject, user)
            setBlogs(blogs.concat(blog))
            setMessage(`a new blog ${blog.title} by ${blog.author} added`)
            notificationTimeout()
        } catch (exception) {
            setMessage('failed')
            setIsError(true)
            notificationTimeout()
        }
    }

    return (
        <Container>
            <Notification message={message} error={isError} />
            <Header>Blogs</Header>
            <Togglable buttonLabel="new blog">
                <BlogForm createBlog={addBlog} user={user} />
            </Togglable>
            {blogs && (
                <ul className="blogs">
                    {blogs.map((blog) => (
                        <ListItem key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>{' '}
                            {blog.author}
                        </ListItem>
                    ))}
                </ul>
            )}
        </Container>
    )
}

export default Bloglist
