import { createSlice } from "@reduxjs/toolkit"
import aneService from "../service/anecdotes"

const anecdoteSlice = createSlice({
	name: "anecdote",
	initialState: [],
	reducers: {
		vote(state, action) {
			const id = action.payload
			console.log(id)
			const toChange = state.find((a) => a.id === id)
			console.log(toChange)
			const newChange = { ...toChange, votes: toChange.votes + 1 }
			return state.map((anecdote) => (anecdote.id !== id ? anecdote : newChange))
		},
		newAne(state, action) {
			state.push(action.payload)
		},
		setAne(state, action) {
			return action.payload
		},
	},
})

const { setAne, newAne, vote } = anecdoteSlice.actions

export const initializeAnes = () => {
	return async (dispatch) => {
		const anes = await aneService.getAll()
		dispatch(setAne(anes))
	}
}

export const appendAne = (content) => {
	return async (dispatch) => {
		const ane = await aneService.createNew(content)
		dispatch(newAne(ane))
	}
}

export const voteAne = (id) => {
	return async (dispatch) => {
		const ane = await aneService.voteAne(id)
		dispatch(vote(ane.id))
	}
}

export default anecdoteSlice.reducer
