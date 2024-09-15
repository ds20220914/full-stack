import { useState } from "react"

const Form = (props) => {
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")
	console.log(newName)
	const addName = (event) => {
		event.preventDefault()

		const nameExists = props.persons.some((person) => person.name === newName)

		if (nameExists) {
			alert(`${newName} is already added to phonebook`)
		} else {
			props.setPersons(props.persons.concat({ name: newName, number: newNumber }))
			console.log(props.persons)
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
	)
}

export default Form
