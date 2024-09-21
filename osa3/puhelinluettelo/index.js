const express = require("express")
const app = express()

let notes = [
	{
		name: "Arto Hellas",
		number: "040-123456",
		id: "1",
	},
	{
		name: "Ada Lovelace",
		number: "39-44-5323523",
		id: "2",
	},
	{
		name: "Dan Abramov",
		number: "12-43-234345",
		id: "3",
	},
	{
		name: "Mary Poppendieck",
		number: "39-23-6423122",
		id: "4",
	},
]

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>")
})

app.get("/api/persons", (request, response) => {
	response.json(notes)
})

app.get("/info", (request, response) => {
	const length = notes.length
	const now = new Date()

	const formattedDate = now.toLocaleString("en-US", {
		weekday: "short", // e.g., "Sat"
		year: "numeric", // e.g., "2024"
		month: "short", // e.g., "Jan"
		day: "numeric", // e.g., "13"
		hour: "numeric", // e.g., "9"
		minute: "numeric", // e.g., "30"
		second: "numeric", // e.g., "25"
		timeZoneName: "long", // e.g., "Eastern European Standard Time"
		timeZone: "Europe/Helsinki", // Set the Eastern European timezone
	})
	const responseText = `
    <p>Phonebook has info for ${length} people</p>
    <p>${formattedDate}</p>
  `

	response.send(responseText)
})

app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id
	const note = notes.find((note) => note.id === id)
	response.json(note)
})

app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id
	notes = notes.filter((note) => note.id !== id)
	response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
