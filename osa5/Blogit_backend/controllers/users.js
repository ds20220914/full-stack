const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", (request, response) => {
	User.find({}).then((user) => {
		response.json(user)
	})
})

usersRouter.post("/", async (request, response, next) => {
	const { username, name, password } = request.body

	if (!username || username.length < 3) {
		{
			return response
				.status(400)
				.json({ error: "Username must be at least 3 characters long" })
		}
	}

	if (!password || password.length < 3) {
		{
			return response
				.status(400)
				.json({ error: "Password must be at least 3 characters long" })
		}
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
	})

	try {
		const savedUser = await user.save()
		response.status(201).json(savedUser)
	} catch (error) {
		next(error)
	}
})

module.exports = usersRouter
