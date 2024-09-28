import axios from "axios"
const baseUrl = "/api/persons"

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
		axios.delete(`/api/persons/${id}`).then(() => {
			setPersons(persons.filter((person) => person.id !== id))
		})
	}
	updateNote("Number deleted")
}

const update = (id, update, persons, setPersons) => {
	axios.put(`/api/persons/${id}`, update).then(() => {
		setPersons(persons.map((person) => (person.id !== id ? person : update)))
	})
	return null
}

export default {
	getAll: getAll,
	create: create,
	handleDelete: handleDelete,
	update: update,
}
