const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user")

	response.json(blogs)
})

blogsRouter.post("/", async (request, response, next) => {
	const body = request.body
	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		if (!decodedToken.id) {
			return response.status(401).json({ error: "token invalid" })
		}

		const user = await User.findById(decodedToken.id)

		const likes = body.likes !== undefined && body.likes !== null ? body.likes : 0

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: likes,
			user: user._id,
		})

		const result = await blog.save()

		response.status(201).json(result)
		console.log("saved")
	} catch (error) {
		next(error)
	}
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
