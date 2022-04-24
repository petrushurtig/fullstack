import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { useState, useEffect } from 'react'
import Notification from './Notification'
import { Container } from './Bloglist'
import styled from 'styled-components'

const Comment = styled.div`
    margin-bottom: 3px;
    border-bottom: 1px gray solid;
`
const Input = styled.input`
    margin-bottom: 5px;
    width: 70%;
`
const GreenButton = styled.button`
    background: Forestgreen;
    padding: 4px;
    border-radius: 8px;
    font-size: 15px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
`
const RedButton = styled.button`
    background: red;
    padding: 4px;
    border-radius: 8px;
    font-size: 15px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const SingleBlog = ({ user }) => {
    const id = useParams().id
    const [blog, setBlog] = useState()
    const navigate = useNavigate()
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(false)

    const notificationTimeout = () => {
        setTimeout(() => {
            setMessage(null)
            setIsError(false)
        }, 5000)
    }

    useEffect(() => {
        const fetchData = async () => {
            const blog = await blogService.getOne(id)
            if (blog) {
                setBlog(blog)
            }
        }
        fetchData()
    }, [])
    if (!blog) {
        return <div>loading...</div>
    }

    const own = blog.user && user.username === blog.user.username
    const handleLike = async (blog) => {
        const updatedBlog = {
            id: blog.id,
            title: blog.title,
            author: blog.title,
            url: blog.url,
            likes: blog.likes + 1,
        }
        try {
            const res = await blogService.updateBlog(updatedBlog, user)
            setBlog(res)
            setMessage('updated')
            notificationTimeout()
        } catch (exception) {
            setMessage('failed')
            setIsError(true)
            notificationTimeout()
            console.log(exception.message)
        }
    }

    const addComment = async (e) => {
        e.preventDefault()
        if (comment.length < 1) {
            return null
        }
        const content = {
            content: comment,
        }
        const res = await blogService.addComment(id, content)
        setComment('')
        setBlog(res)
    }
    const removeBlog = async () => {
        if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
            try {
                await blogService.removeBlog(blog, user)
                setMessage('deleted')
                notificationTimeout()
            } catch (exception) {
                setMessage('failed')
                setIsError(true)
                notificationTimeout()
                console.log(exception.message)
            }
        }
    }

    return (
        <Container>
            <Notification message={message} error={isError} />
            <h2>
                {blog.title} {blog.author}
            </h2>
            <p>{blog.url}</p>
            <p>
                likes: {blog.likes}{' '}
                <GreenButton onClick={() => handleLike(blog)}>like</GreenButton>{' '}
            </p>
            {blog.user !== null ? (
                <p>added by {blog.user.name}</p>
            ) : (
                <p>added by anonymous</p>
            )}

            {own && (
                <RedButton onClick={() => removeBlog(blog.id)}>
                    remove
                </RedButton>
            )}
            <div>
                <h2>Comments</h2>
                <div>
                    <form onSubmit={addComment}>
                        <Input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment"
                        ></Input>{' '}
                        <GreenButton>Submit</GreenButton>
                    </form>
                </div>
                {blog.comments.length > 0 ? (
                    blog.comments.map((comment) => (
                        <Comment key={comment.id}>{comment.content}</Comment>
                    ))
                ) : (
                    <p>No comments</p>
                )}
            </div>
        </Container>
    )
}
export default SingleBlog
