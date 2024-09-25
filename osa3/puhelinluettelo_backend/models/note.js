const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const url = `mongodb+srv://junhaoshao2002:875292211@cluster0.9nsf2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

console.log("connecting to", url)
mongoose
	.connect(url)
	.then((result) => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message)
	})

const noteSchema = new mongoose.Schema({
	name: String,
	number: Number,
})

noteSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

module.exports = mongoose.model("Note", noteSchema)
