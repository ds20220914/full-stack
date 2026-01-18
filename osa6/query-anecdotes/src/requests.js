const baseUrl = 'http://localhost:3001/anecdotes'

export const getAne = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }
  return await response.json()
}

export const createAne = async (newAne) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAne),
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to create note')
  }

  return await response.json()
}

export const voteAne = async (id) => {
  const getResponse = await fetch(`${baseUrl}/${id}`)
  const ane = await getResponse.json()
  const updatedAne = { ...ane, votes: ane.votes + 1 }
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAne),
  }

  const response = await fetch(`${baseUrl}/${id}`, options)

  if (!response.ok) {
    throw new Error('Failed to create note')
  }

  return await response.json()
}
