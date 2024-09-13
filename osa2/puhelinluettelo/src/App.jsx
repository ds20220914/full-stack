import { useState } from "react"

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
	const [newName, setNewName] = useState("")
	console.log(persons)
	const addName = (event) => {
		event.preventDefault()

		setPersons(persons.concat({ name: newName }))
		console.log(persons)
		setNewName("")
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person, index) => (
					<li key={index}>{person.name}</li>
				))}
			</ul>
		</div>
	)
}

export default App
