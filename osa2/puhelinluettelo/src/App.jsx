import { useState } from "react"
import Filter from "./Components/Filter"
import Persons from "./Components/Persons"
import Form from "./Components/Form"

const App = () => {
	const [filter, setFilter] = useState("")
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas" },
		{ name: "Ada Lovelace" },
		{ name: "Dan Abramov" },
		{ name: "Mary Poppendieck" },
	])

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
