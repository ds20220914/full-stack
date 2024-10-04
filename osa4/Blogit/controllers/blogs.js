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

module.exports = blogsRouter
