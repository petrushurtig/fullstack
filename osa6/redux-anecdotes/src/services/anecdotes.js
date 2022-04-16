import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes/'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createNew = async (content) => {
    const obj = { content, votes: 0 }
    const res = await axios.post(baseUrl, obj)
    console.log(obj)
    return res.data
}

const addVote = async (anecdote) => {
    const prevVotes = anecdote.votes
    const res = await axios.patch(baseUrl + anecdote.id, {votes: prevVotes + 1})
    return res.data
}

export default { getAll, createNew, addVote }