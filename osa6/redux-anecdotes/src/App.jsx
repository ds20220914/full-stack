import AnecdoteForm from "./components/AnecdoteForm"
import AnecditeList from "./components/AnecdoteList"
import Filter from "./components/Filter"

const App = () => {
	return (
		<div>
			<h2>Anecdotes</h2>
			<Filter />
			<AnecditeList />
			<h2>create new</h2>
			<AnecdoteForm />
		</div>
	)
}

export default App
