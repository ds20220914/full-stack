import { useState } from "react"

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")

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

	return (
		<div>
			<h2>Phonebook</h2>
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
				{persons.map((person, index) => (
					<li key={index}>
						{person.name} {person.number}
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
