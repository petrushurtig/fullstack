import { Link } from 'react-router-dom'
import { Container } from './Bloglist'
import styled from 'styled-components'

const Table = styled.table`
    width: 100%;
    background: ghostwhite;
`
const Td = styled.td`
    border: solid black 1px;
    text-align: center;
    font-weight: bold;
`

const Userlist = ({ users }) => {
    return (
        <Container>
            <h2>Users</h2>
            <Table>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <b>blogs created</b>
                        </td>
                    </tr>
                    {users &&
                        users.map((user) => (
                            <tr key={user.id}>
                                <Td>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </Td>
                                <Td>{user.blogs.length}</Td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    )
}
export default Userlist
