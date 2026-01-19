import { useReducer, createContext } from 'react'

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'notification':
      return action.payload
    case 'clear':
      return ''
    default:
      return state
  }
}

const NotiContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    '',
  )

  return (
    <NotiContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </NotiContext.Provider>
  )
}

export default NotiContext
