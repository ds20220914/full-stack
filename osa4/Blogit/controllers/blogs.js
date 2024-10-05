const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs)
	})
})

blogsRouter.post("/", (request, response) => {
	const body = request.body

	const likes = body.likes !== undefined && body.likes !== null ? body.likes : 0

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: likes,
	})

	blog.save().then((result) => {
		response.status(201).json(result)
		console.log("saved")
	})
})

blogsRouter.delete("/:id", async (request, response) => {
	const id = request.params.id
	await Blog.findByIdAndDelete(id)
	response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
	const id = request.params.id
	const { title, author, url, likes } = request.body
	const update = await Blog.findByIdAndUpdate(
		id,
		{ title, author, url, likes },
		{ new: true }
	)
	response.json(update)
})

module.exports = blogsRouter
