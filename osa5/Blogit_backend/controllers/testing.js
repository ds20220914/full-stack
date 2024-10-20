const testingRouter = require("express").Router()
const Blog = require("../models/blog")
const User2 = require("../models/user")

testingRouter.post("/reset", async (request, response) => {
	await Blog.deleteMany({})
	await User2.deleteMany({})

	response.status(204).end()
})

module.exports = testingRouter
