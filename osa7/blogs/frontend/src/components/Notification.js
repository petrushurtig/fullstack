import styled from 'styled-components'

const ErrorNotification = styled.div`
    color: red;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
`
const SuccessNotification = styled.div`
    color: green;
    background: lightgrey;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
`

const Notification = ({ error, message }) => {
    if (message !== null)
        return (
            <>
                {error === true ? (
                    <ErrorNotification>{message}</ErrorNotification>
                ) : (
                    <SuccessNotification>{message}</SuccessNotification>
                )}
            </>
        )
    return null
}
export default Notification
