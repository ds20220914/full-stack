import { useDispatch } from "react-redux"
import { newAne } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.ane.value
		event.target.ane.value = ""
		dispatch(newAne(content))
	}
	return (
		<div>
			<form onSubmit={addAnecdote}>
				<div>
					<input name="ane" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
