const express = require("express")
const morgan = require("morgan")
const app = express()
const cors = require("cors")

app.use(express.static("dist"))
app.use(cors())

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
app.use(express.json())

morgan.token("body", (req) => {
	return JSON.stringify(req.body)
})

app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms :body", {
		skip: (req) => req.method !== "POST",
	})
)

app.use(morgan("tiny"))
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

app.post("/api/persons", (request, response) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: "content missing",
		})
	}

	const existNumber = () => notes.some((note) => note.name === body.name)
	if (existNumber.length !== 0) {
		return response.status(400).json({ error: "name must be unique" })
	}

	const note = {
		name: body.name,
		number: body.number,
		id: Math.random() * 1000000,
	}

	notes = notes.concat(note)
	response.json(body)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
