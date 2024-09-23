import { useState } from "react"
import services from "../services/note"

const Form = (props) => {
	const [newName, setNewName] = useState("")
	const [newNumber, setNewNumber] = useState("")

	console.log(newName)
	const addName = async (event) => {
		event.preventDefault()

		const nameExists = props.persons.some((person) => person.name === newName)

		if (nameExists) {
			const confirmUpdate = window.confirm(
				`${newName} is already added to the phonebook, replace the old number with the new one?`
			)
			const updateID = props.persons.find((person) => person.name === newName)

			if (confirmUpdate) {
				const updatedPerson = { name: newName, number: newNumber }
				console.log(updateID)
				services.update(updateID.id, updatedPerson)
				props.setPersons(
					props.persons.map((person) =>
						person.id !== updateID ? person : response.data
					)
				)
			}
			props.updateNote("Number updated")
			setNewName("")
			setNewNumber("")
		} else {
			const newEntry = await services.create({ name: newName, number: newNumber })
			console.log("1", newEntry)
			props.setPersons(props.persons.concat(newEntry))

			console.log(props.persons)
			props.updateNote("New number added")
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
