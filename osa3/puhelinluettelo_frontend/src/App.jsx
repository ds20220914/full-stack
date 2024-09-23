import { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./Components/Filter"
import Persons from "./Components/Persons"
import Form from "./Components/Form"
import services from "./services/note"
import "./index.css"

const App = () => {
	const [filter, setFilter] = useState("")
	const [persons, setPersons] = useState([])
	const [message, setMessage] = useState(null)

	const Notification = (props) => {
		console.log(props.message)
		if (props.message === null) {
			return null
		}
		if (props.message !== null) {
			return <div className="notemessage">{props.message.content}</div>
		}
	}
	console.log(message)
	useEffect(() => {
		services.getAll().then((response) => {
			setPersons(response)
		})
	}, [])

	const note = (content) => {
		setMessage({ content })
		setTimeout(() => {
			setMessage(null)
		}, 5000)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Filter filter={filter} setFilter={setFilter} />
			<h2>Add a new</h2>
			<Form persons={persons} setPersons={setPersons} updateNote={note} />
			<h2>Numbers</h2>
			<Persons
				filter={filter}
				persons={persons}
				setPersons={setPersons}
				updateNote={note}
			/>
		</div>
	)
}

export default App
