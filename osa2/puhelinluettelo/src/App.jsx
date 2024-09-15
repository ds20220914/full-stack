import { useState } from "react"

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas" },
		{ name: "Ada Lovelace" },
		{ name: "Dan Abramov" },
		{ name: "Mary Poppendieck" },
	])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	const [filter, setFilter] = useState("")

	console.log(persons)
	const addName = (event) => {
		event.preventDefault()

		const nameExists = persons.some((person) => person.name === newName)

		if (nameExists) {
			alert(`${newName} is already added to phonebook`)
		} else {
			setPersons(persons.concat({ name: newName, number: newNumber }))
			console.log(persons)
			setNewName("")
			setNewNumber("")
		}
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

	const personsToShow = persons.filter((person) =>
		person.name.toLowerCase().includes(filter.toLowerCase())
	)

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with <input value={filter} onChange={handleFilterChange} />
			</div>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{personsToShow.map((person, index) => (
					<li key={index}>
						{person.name} {person.number}
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
