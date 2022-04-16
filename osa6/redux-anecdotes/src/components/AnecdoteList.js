import { useDispatch, useSelector} from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if ( filter === '') {
            return anecdotes
        }
            return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        })
    const vote = (anecdote) => {
        dispatch(addVote(anecdote))
        const voted = anecdotes.find(a => a.id === anecdote.id)
        dispatch(setNotification(`you voted '${voted.content}'`, 3)
        )
      }
       const anecdotesCopy = [...anecdotes]

    return (
        <div>
            {anecdotesCopy
                .sort(function (a,b) {
                    return b.votes - a.votes
                })
                .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                    {anecdote.content}
                    </div>
                    <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
                )}
            </div>
    )
}
export default AnecdoteList