const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const middleware = require("../utils/middleware")

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user")

	response.json(blogs)
})

blogsRouter.post(
	"/",
	middleware.tokenExtractor,
	middleware.userExtractor,
	async (request, response, next) => {
		const body = request.body
		try {
			const user = request.user
			const likes =
				body.likes !== undefined && body.likes !== null ? body.likes : 0

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
	}
)

blogsRouter.delete(
	"/:id",
	middleware.userExtractor,
	async (request, response, next) => {
		try {
			const id = request.params.id
			const user = request.user
			console.log(user)
			const blog = await Blog.findById(id)
			if (!blog) {
				return response.status(404).json({ error: "blog not found" })
			}

			if (blog.user.toString() === user.id.toString()) {
				await Blog.findByIdAndDelete(id)
				response.status(204).end()
			} else {
				return response.json({ error: "user not same" })
			}
		} catch (error) {
			next(error)
		}
	}
)

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
