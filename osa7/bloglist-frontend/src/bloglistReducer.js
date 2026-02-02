const bloglistReducer = (state = [], action) => {
	switch (action.type) {
		case "SetBlogs":
			return action.payload

		case "newBlog":
			state.concat(action.payload)

		default:
			return state
	}
}

export const setBlogs = (content) => {
	return {
		type: "SetBlogs",
		payload: {
			content,
		},
	}
}

export const createBlog = (content) => {
	return {
		type: "newBlog",
		payload: {
			content,
		},
	}
}

export default bloglistReducer
