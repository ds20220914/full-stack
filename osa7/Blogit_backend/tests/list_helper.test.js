const { test, describe } = require("node:test")
const assert = require("node:assert")
const listHelper = require("../utils/list_helper")
const _ = require("lodash")

describe("total likes", () => {
	const listWithOneBlog = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
	]
	const listWithBlogs = [
		{
			_id: "5a422a851b54a676234d17f7",
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 7,
			__v: 0,
		},
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
		{
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0,
		},
	]

	test("when list has only one blog equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		assert.strictEqual(result, 5)
	})

	test("blog with most likes", () => {
		const result = listHelper.favoriteBlog(listWithBlogs)
		assert.strictEqual(result, listWithBlogs[2])
	})

	test("author with most blogs", () => {
		const result = listHelper.mostBlogs(listWithBlogs)
		const answer = { author: "Edsger W. Dijkstra", blogs: 2 }
		assert.deepStrictEqual(result, answer)
	})

	test("author with most likes", () => {
		const result = listHelper.mostLikes(listWithBlogs)
		const answer = { author: "Edsger W. Dijkstra", likes: 17 }
		assert.deepStrictEqual(result, answer)
	})
})
