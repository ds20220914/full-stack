import { createSlice } from "@reduxjs/toolkit"

const filterReducer = (state = "", action) => {
	switch (action.type) {
		case "SET_FILTER":
			return action.payload.toLowerCase()
		default:
			return state
	}
}

export const filterChange = (filter) => {
	return {
		type: "SET_FILTER",
		payload: filter,
	}
}

const initialState = ""

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setFilter(state, action) {
			return action.payload.toLowerCase()
		},
	},
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
