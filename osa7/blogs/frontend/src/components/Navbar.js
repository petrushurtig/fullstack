import { Routes, Route, Link } from 'react-router-dom'
import Bloglist from './Bloglist'
import Userlist from './Userlist'
import User from './User'
//import Blog from './Blog'
import SingleBlog from './SingleBlog'
import styled from 'styled-components'

const Container = styled.div`
    background: Bisque;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3vh;
`

const Navbar = ({ blogs, setBlogs, user, users, handleLogout }) => {
    const padding = {
        padding: 10,
    }
    return (
        <div>
            {user && (
                <Container>
                    <div>
                        <Link style={padding} to="/blogs">
                            Blogs
                        </Link>

                        <Link style={padding} to="/users">
                            Users
                        </Link>
                    </div>
                    <div>
                        {user.name} logged in{' '}
                        <button onClick={handleLogout}>logout</button>
                    </div>
                </Container>
            )}
            <Routes>
                <Route
                    path="/blogs"
                    element={
                        <Bloglist
                            user={user}
                            setBlogs={setBlogs}
                            blogs={blogs}
                        />
                    }
                />
                <Route path="/users" element={<Userlist users={users} />} />
                <Route path="/users/:id" element={<User users={users} />} />
                <Route
                    path="/blogs/:id"
                    element={<SingleBlog blogs={blogs} user={user} />}
                />
            </Routes>
        </div>
    )
}

export default Navbar
