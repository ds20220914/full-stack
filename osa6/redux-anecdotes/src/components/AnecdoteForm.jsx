import { useDispatch } from "react-redux"
import { appendAne } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notification"

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.ane.value
		event.target.ane.value = ""
		dispatch(appendAne(content))
		dispatch(showNotification(`you added '${content}'`, 10))
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
