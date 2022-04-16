import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification: (state,actions) => {
           return actions.payload
        },
        hideNotification: () => {
           return ''
        }
    }
})

export const { createNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    console.log(message)
    return  dispatch => {
        dispatch(
            createNotification(message),
            setTimeout(() => {
                dispatch(hideNotification())
                }, (time * 1000))
        )}
}
export default notificationSlice.reducer
