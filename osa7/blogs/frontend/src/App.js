import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'

import loginService from './services/login.js'
import userService from './services/users'
import blogService from './services/blogs'
import './App.css'
import Togglable from './components/Togglable'

const Background = styled.div`
    background: GainsBoro;
    height: 100vh;
`
const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(false)
    const [blogs, setBlogs] = useState([])
    const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const users = await userService.getAll()
            if (users.length > 0) {
                setUsers(users)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const blogs = await blogService.getAll()
            if (blogs.length > 0) {
                setBlogs(blogs.sort(byLikes))
            }
        }
        fetchData()
    }, [])

    const handleLogout = () => {
        setUser(null)
        window.localStorage.clear()
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setMessage('wrong credentials')
            setIsError(true)
            notificationTimeout()
        }
    }

    const notificationTimeout = () => {
        setTimeout(() => {
            setMessage(null)
            setIsError(false)
        }, 5000)
    }

    return (
        <Background>
            <Navbar
                user={user}
                users={users}
                blogs={blogs}
                setBlogs={setBlogs}
                handleLogout={handleLogout}
            />
            <Notification message={message} error={isError} />

            {!user && (
                <Togglable buttonLabel="login">
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) =>
                            setUsername(target.value)
                        }
                        handlePasswordChange={({ target }) =>
                            setPassword(target.value)
                        }
                        handleSubmit={handleLogin}
                    />
                </Togglable>
            )}
        </Background>
    )
}

export default App
