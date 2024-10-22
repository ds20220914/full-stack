import AnecdoteForm from "./components/AnecdoteForm"
import AnecditeList from "./components/AnecdoteList"

const App = () => {
	return (
		<div>
			<h2>Anecdotes</h2>
			<AnecditeList />
			<h2>create new</h2>
			<AnecdoteForm />
		</div>
	)
}

export default App
