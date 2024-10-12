import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	console.log("res", response)
	return response.data
}

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const like = async (id, newBlog, likes) => {
	const update = {
		title: newBlog.title,
		author: newBlog.author,
		url: newBlog.url,
		likes: likes + 1,
	}
	const response = await axios.put(`${baseUrl}/${id}`, update)
	return response.data
}

export default { getAll, setToken, create, like }
