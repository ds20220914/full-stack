import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAne, voteAne } from './requests'
import { NotificationContextProvider } from './components/notiContext'

const App = () => {
  const queryClient = useQueryClient()
  const voteMutation = useMutation({
    mutationFn: voteAne,
    onSuccess: (voted) => {
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((a) => (a.id === voted.id ? voted : a)),
      )
    },
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote.id)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAne,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>Anecdotes service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContextProvider>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContextProvider>
  )
}

export default App
