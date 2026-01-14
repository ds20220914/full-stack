import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
	const anecdote = useSelector((state) => state.anecdote)
	const filter = useSelector((state) => state.filter)
	console.log("tulos", anecdote)
	const anecdotes = filter
		? anecdote.filter((a) => a.content.toLowerCase().includes(filter))
		: anecdote
	console.log(anecdotes)
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
