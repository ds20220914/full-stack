import AnecdoteForm from "./components/AnecdoteForm"
import AnecditeList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
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
