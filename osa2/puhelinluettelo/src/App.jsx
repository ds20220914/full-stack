import { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./Components/Filter"
import Persons from "./Components/Persons"
import Form from "./Components/Form"
import services from "./services/note"

const App = () => {
	const [filter, setFilter] = useState("")
	const [persons, setPersons] = useState([])

	useEffect(() => {
		services.getAll().then((response) => {
			setPersons(response)
		})
	}, [])

	console.log(persons)
	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} setFilter={setFilter} />
			<h2>Add a new</h2>
			<Form persons={persons} setPersons={setPersons} />
			<h2>Numbers</h2>
			<Persons filter={filter} persons={persons} />
		</div>
	)
}

export default App
