import { useEffect } from "react"
import { useDispatch } from "react-redux"

import AnecdoteForm from "./components/AnecdoteForm"
import AnecditeList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { initializeAnes } from "./reducers/anecdoteReducer"
const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeAnes())
	}, [dispatch])

	return (
		<div>
			<Notification />
			<h2>Anecdotes</h2>
			<Filter />
			<AnecditeList />
			<h2>create new</h2>
			<AnecdoteForm />
		</div>
	)
}

export default App
