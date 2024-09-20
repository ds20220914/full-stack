import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject)
	return request.then((response) => response.data)
}

const handleDelete = (id, name, persons, setPersons, updateNote) => {
	if (window.confirm(`Delete ${name}?`)) {
		axios.delete(`http://localhost:3001/persons/${id}`).then(() => {
			setPersons(persons.filter((person) => person.id !== id))
		})
	}
	updateNote("Number deleted")
}

const update = (id, update) => {
	axios.put(`http://localhost:3001/persons/${id}`, update)
}

export default {
	getAll: getAll,
	create: create,
	handleDelete: handleDelete,
	update: update,
}
