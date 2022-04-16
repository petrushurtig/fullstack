import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification.content === '' )
  return (
    <div style={{padding:10}}></div>
  )
  return (
    <div style={style}>
      {notification.content}
    </div>
  )
}

export default Notification