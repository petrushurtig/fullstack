import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
    const [content, contentChange, resetContent] = useField("text")
    const [author, authorChange, resetAuthor] = useField("text")
    const [info, infoChange, resetInfo] = useField("text")

    const navigate = useNavigate()
    const handleReset = (e) => {
      resetContent()
      resetAuthor()
      resetInfo()
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content,
        author: author,
        info: info,
        votes: 0
      })
      navigate('/')
    }
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...contentChange} type="text"/>
          </div>
          <div>
            author
            <input {...authorChange} type="text"/>
          </div>
          <div>
            url for more info
            <input {...infoChange} type="text" />
          </div>
          <button type='submit'>create</button>
        </form>
        <button onClick={handleReset}>reset</button>
      </div>
    )
  }
export default CreateNew