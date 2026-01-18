const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
	const response = await fetch(baseUrl)

	if (!response.ok) {
		throw new Error("Failed to fetch notes")
	}

	const data = await response.json()
	return data
}

const createNew = async (content) => {
	const options = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ content, votes: 0 }),
	}

	const response = await fetch(baseUrl, options)

	if (!response.ok) {
		throw new Error("Failed to create note")
	}

	return await response.json()
}

export const voteAne = async (id) => {
	const getResponse = await fetch(`${baseUrl}/${id}`)
	const ane = await getResponse.json()
	const updatedAne = { ...ane, votes: ane.votes + 1 }
	console.log(updatedAne)
	const options = {
		method: "PATCH", // PATCH muuttaa vain osan resurssista, PUT korvaisi koko objektin
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updatedAne), // esim. { votes: 5 }
	}

	const response = await fetch(`${baseUrl}/${id}`, options)

	if (!response.ok) {
		throw new Error("Failed to vote for anecdote")
	}

	return await response.json()
}

export default { getAll, createNew, voteAne }
