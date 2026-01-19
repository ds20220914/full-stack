import { useContext } from 'react'
import NotiContext from './notiContext'

const Notification = () => {
  const { notification } = useContext(NotiContext)
  console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return <div style={style}>{notification}</div>
}

export default Notification
