import PropTypes from 'prop-types'
import { Container } from './Bloglist'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {
    return (
        <Container>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        name="username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id="login-button" type="submit">
                    login
                </button>
            </form>
        </Container>
    )
}
LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}

export default LoginForm
