import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state)
	const dispatch = useDispatch()

	const vote2 = (id) => {
		dispatch(vote(id))
	}
	return (
		<div>
			{anecdotes
				.slice()
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote2(anecdote.id)}>vote</button>
						</div>
					</div>
				))}
		</div>
	)
}

export default AnecdoteList
