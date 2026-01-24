import { useState } from "react"
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useMatch,
	useNavigate,
} from "react-router-dom"
import { useField } from "./hooks"

const Menu = () => {
	const padding = {
		paddingRight: 5,
	}
	return (
		<div>
			<Link style={padding} to="/">
				anecdotes
			</Link>
			<Link style={padding} to="/CreateNew">
				create new
			</Link>
			<Link style={padding} to="/About">
				about
			</Link>
		</div>
	)
}

const AnecdoteList = ({ anecdotes }) => {
	const padding = {
		paddingRight: 5,
	}
	return (
		<div>
			<h2>Anecdotes</h2>
			<ul>
				{anecdotes.map((anecdote) => (
					<li key={anecdote.id}>
						<Link style={padding} to={`/anecdotes/${anecdote.id}`}>
							{anecdote.content}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>
			An anecdote is a brief, revealing account of an individual person or an
			incident. Occasionally humorous, anecdotes differ from jokes because their
			primary purpose is not simply to provoke laughter but to reveal a truth more
			general than the brief tale itself, such as to characterize a person by
			delineating a specific quirk or trait, to communicate an abstract idea about
			a person, place, or thing through the concrete details of a short narrative.
			An anecdote is "a story with a point."
		</em>

		<p>
			Software engineering is full of excellent anecdotes, at this app you can find
			the best and add more.
		</p>
	</div>
)

const Footer = () => (
	<div>
		Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>. See{" "}
		<a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
			https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
		</a>{" "}
		for the source code.
	</div>
)

const CreateNew = (props) => {
	const navigate = useNavigate()
	const content = useField("text")
	const author = useField("text")
	const info = useField("text")

	const handleSubmit = (e) => {
		e.preventDefault()
		props.addNew({
			content: content.input.value,
			author: author.input.value,
			info: info.input.value,
			votes: 0,
		})

		navigate("/")
	}

	const clear = (e) => {
		e.preventDefault()
		content.reset()
		author.reset()
		info.reset()
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content.input} />
				</div>
				<div>
					author
					<input {...author.input} />
				</div>
				<div>
					url for more info
					<input {...info.input} />
				</div>
				<button>create</button>
				<button type="button" onClick={clear}>
					reset
				</button>
			</form>
		</div>
	)
}

const Anecdote = ({ anecdote }) => {
	console.log(anecdote)
	return (
		<div>
			<h2>
				{anecdote.content} by {anecdote.author}
			</h2>
			<p>has {anecdote.votes} votes</p>
			<p>for more info see {anecdote.info}</p>
		</div>
	)
}

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: "If it hurts, do it more often",
			author: "Jez Humble",
			info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
			votes: 0,
			id: 1,
		},
		{
			content: "Premature optimization is the root of all evil",
			author: "Donald Knuth",
			info: "http://wiki.c2.com/?PrematureOptimization",
			votes: 0,
			id: 2,
		},
	])

	const match = useMatch("/anecdotes/:id")
	const anecdote = match
		? anecdotes.find((ane) => ane.id === Number(match.params.id))
		: null

	const [notification, setNotification] = useState("")

	const Notification = () => <div>{notification}</div>

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000)
		setAnecdotes(anecdotes.concat(anecdote))
		setNotification(`A new anecdote "${anecdote.content}" created!`)
		setTimeout(() => {
			setNotification("")
		}, 5000)
	}

	const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

	const vote = (id) => {
		const anecdote = anecdoteById(id)

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1,
		}

		setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
	}

	return (
		<div>
			<h1>Software anecdotes</h1>
			<Menu />
			<Notification />
			<Routes>
				<Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
				<Route path="/CreateNew" element={<CreateNew addNew={addNew} />} />
				<Route path="/About" element={<About />} />
				<Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
			</Routes>

			<Footer />
		</div>
	)
}

export default App
