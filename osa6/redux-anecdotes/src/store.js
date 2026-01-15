import anecdoteReducer from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer"
import notificationReducer from "./reducers/notification"

import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
	reducer: {
		anecdote: anecdoteReducer,
		filter: filterReducer,
		notification: notificationReducer,
	},
})

export default store
