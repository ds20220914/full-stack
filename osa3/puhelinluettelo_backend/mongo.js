const mongoose = require("mongoose")

if (process.argv.length < 3) {
	console.log("give password as argument")
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://junhaoshao2002:${password}@cluster0.9nsf2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set("strictQuery", false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
	name: String,
	number: Number,
})

const Note = mongoose.model("Note", noteSchema)

if (process.argv.length === 5) {
	const name = process.argv[3]

	const number = process.argv[4]

	const note = new Note({
		name: name,
		number: number,
	})

	note.save().then((result) => {
		console.log("added", name, "number", number, "to phonebook")
		mongoose.connection.close()
	})
}

if (process.argv.length === 3) {
	console.log("phonebook:")
	Note.find({}).then((result) => {
		result.forEach((note) => {
			console.log(note.name, note.number)
		})
		mongoose.connection.close()
	})
}
