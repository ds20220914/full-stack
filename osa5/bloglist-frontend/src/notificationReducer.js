const notificationReducer = (state = [], action) => {
	switch (action.type) {
		case "Notification":
			return action.payload

		default:
			return state
	}
}
export const createNoti = (content) => {
	return {
		type: "Notification",
		payload: {
			content,
		},
	}
}

export default notificationReducer
