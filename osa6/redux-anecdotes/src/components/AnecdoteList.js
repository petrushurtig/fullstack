import { useDispatch, useSelector} from "react-redux";
import { addVote } from "../reducers/store";
import { createNotification, hideNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const dispatch = useDispatch()

    //const anecdotes = useSelector(state => state.anecdotes)
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if ( filter === '') {
            return anecdotes
        }
            return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        })

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
        const voted = anecdotes.find(a => a.id === id)
        dispatch(createNotification({
            content: `you voted '${voted.content}'`
        }),
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
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
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
                )}
            </div>
    )
}
export default AnecdoteList