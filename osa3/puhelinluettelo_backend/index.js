require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const app = express()
const cors = require("cors")
const Note = require("./models/note")

app.use(express.static("dist"))
app.use(cors())
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
	Note.find({})
		.then(
			Note.find({}).then((notes) => {
				response.json(notes)
			})
		)
		.catch((error) => {
			next(error)
		})
})

app.get("/info", (request, response) => {
	Note.find({}).then((notes) => {
		const length = notes.length
		const now = new Date()

		const formattedDate = now.toLocaleString("fi-FI", {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			timeZoneName: "long",
			timeZone: "Europe/Helsinki",
		})

		const responseText = `
            <p>Puhelinluettelossa on yhteystiedot ${length} henkilölle</p>
            <p>${formattedDate}</p>
        `

		response.send(responseText)
	})
})

app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id
	Note.findById(id)
		.then((note) => {
			if (note) {
				response.json(note)
			} else {
				response.status(404).end()
			}
		})
		.catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id
	Note.findByIdAndDelete(id)
		.then(response.status(204).end())
		.catch((error) => next(error))
})

app.put("/api/persons/:id", (request, response) => {
	const id = request.params.id
	const body = request.body
	const updatedPerson = {
		name: body.name,
		number: body.number,
	}
	Note.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true })
		.then((savedNote) => response.json(savedNote))
		.catch((error) => next(error))
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

	const note = new Note({
		name: body.name,
		number: body.number,
	})

	note
		.save()
		.then((savedNote) => {
			response.json(savedNote)
		})
		.catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}

app.use(errorHandler)

const PORTTI = process.env.PORT
app.listen(PORTTI, () => {
	console.log(`Server running on port ${PORTTI}`)
})
