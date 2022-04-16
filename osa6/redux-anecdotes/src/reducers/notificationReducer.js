import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        content: ''
    }
]

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification: (state,action) => {
            return ({
                content: action.payload.content
            })
        },
        hideNotification: (state, action) => {
            return ({
                content: ''
            })
        }
    }
})

export const { createNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
