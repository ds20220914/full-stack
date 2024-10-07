const { test, after, beforeEach, describe } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")
const User = require("../models/user")

describe("User creation", () => {
	beforeEach(async () => {
		await User.deleteMany({})
		const user = new User({
			username: "root",
			name: "david",
			passwordHash: "sekret",
		})
		await user.save()
	})

	test("user creation fail with short username", async () => {
		const newUser = {
			username: "xd",
			name: "david",
			password: "2002",
		}
		const result = await api.post("/api/users").send(newUser).expect(400)
		assert.deepStrictEqual(
			result.body.error,
			"Username must be at least 3 characters long"
		)
	})
	test("user creation fail with short password", async () => {
		const newUser = {
			username: "junhao",
			name: "junhao",
			password: "20",
		}
		const result = await api.post("/api/users").send(newUser).expect(400)
		assert.deepStrictEqual(
			result.body.error,
			"Password must be at least 3 characters long"
		)
	})

	test.only("fails if username is already taken", async () => {
		const newUser = {
			username: "root",
			name: "david",
			password: "sekret",
		}

		const result = await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/)

		assert.deepStrictEqual(result.body.error, "expected `username` to be unique")
	})

	test("succeeds with a valid username and password", async () => {
		const newUser = {
			username: "validuser",
			name: "Valid User",
			password: "validpassword",
		}

		const result = await api.post("/api/users").send(newUser).expect(201)

		assert.deepStrictEqual(result.body.username, "validuser")
	})
})

after(async () => {
	await mongoose.connection.close()
})
