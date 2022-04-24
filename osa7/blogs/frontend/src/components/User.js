import { useParams } from 'react-router-dom'
import { Container } from './Bloglist'

const User = ({ users }) => {
    const id = useParams().id
    const user = users.find((u) => u._id === id)
    console.log(user)
    if (!user) {
        return <div>loading...</div>
    }
    return (
        <Container>
            <h2>{user.name}</h2>
            <h4>Added blogs</h4>
            {user.blogs.length < 1 ? (
                <p>None</p>
            ) : (
                <div>
                    {user.blogs.map((blog) => (
                        <li key={blog.id}>{blog.title}</li>
                    ))}
                </div>
            )}
        </Container>
    )
}
export default User
