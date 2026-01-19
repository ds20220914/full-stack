import { useMutation } from '@tanstack/react-query'
import { createAne } from '../requests'
import { useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotiContext from './notiContext'

const AnecdoteForm = () => {
  const { notificationDispatch } = useContext(NotiContext)

  const queryClient = useQueryClient()
  const newAneMutation = useMutation({
    mutationFn: createAne,
    onSuccess: (newAne) => {
      const aness = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], aness.concat(newAne))
      notificationDispatch({
        type: 'notification',
        payload: `You created '${newAne.content}'`,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAneMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
