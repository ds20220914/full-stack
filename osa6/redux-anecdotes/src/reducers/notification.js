import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	message: "",
	visible: false,
}

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification: (state, action) => {
			state.message = action.payload.message
			state.visible = true
		},
		clearNotification: (state) => {
			state.message = ""
			state.visible = false
		},
	},
})

export const { setNotification, clearNotification } = notificationSlice.actions

// Thunk to set a notification with a timeout
export const showNotification = (message, seconds) => {
	return (dispatch) => {
		dispatch(setNotification({ message }))

		setTimeout(() => {
			dispatch(clearNotification())
		}, seconds * 1000) // convert seconds to milliseconds
	}
}

export default notificationSlice.reducer
