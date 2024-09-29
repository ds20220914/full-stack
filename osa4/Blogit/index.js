require("dotenv").config() // Lisää dotenv-kirjaston käyttö

const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const morgan = require("morgan")

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

const blogSchema = mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
})

mongoose.set("strictQuery", false)
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

const Blog = mongoose.model("Blog", blogSchema)

app.get("/api/blogs", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs)
	})
})

app.post("/api/blogs", (request, response) => {
	const body = request.body
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	})

	blog.save().then((result) => {
		response.status(201).json(result)
		console.log("saved")
		mongoose.connection.close()
	})
})

const PORT = process.env.PORT || 3003 // PORT otetaan myös ympäristömuuttujasta
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
