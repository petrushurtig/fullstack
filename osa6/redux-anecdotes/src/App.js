import NewAnecdote from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <NewAnecdote />
      <AnecdoteList />
    </div>
  )
}
export default App