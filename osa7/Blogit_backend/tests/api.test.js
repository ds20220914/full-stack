const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

const helper = require("./test_helper")
const Blog = require("../models/blog")

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
	const promiseArray = blogObjects.map((blog) => blog.save())
	await Promise.all(promiseArray)
})

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/)
})

test("blogin identifioiva kenttä on nimeltään id", async () => {
	const response = await api.get("/api/blogs")

	response.body.forEach((blog) => {
		assert.ok(blog.id)
		assert.strictEqual(blog._id, undefined)
	})
})

test("a blog can be added", async () => {
	const newBlog = {
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0,
	}

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/)

	const response = await api.get("/api/blogs")

	assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
})

test("likes asennetaan nollaksi jos on tyhjä", async () => {
	const newBlog = {
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: null,
		__v: 0,
	}
	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/)

	const response = await api.get("/api/blogs")

	assert.strictEqual(response.body[2].likes, 0)
})

test("a blog can be deleted", async () => {
	const response = await api.delete("/api/blogs/5a422aa71b54a676234d17f8")
	const response2 = await api.get("/api/blogs")
	assert.strictEqual(response2.body.length, 1)
})

test.only("update a blog", async () => {
	const response = await api.put("/api/blogs/5a422a851b54a676234d17f7").send({
		title: "päivitys",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 1,
	})

	assert.deepStrictEqual(response.body.title, "päivitys")
})

after(async () => {
	await mongoose.connection.close()
})
