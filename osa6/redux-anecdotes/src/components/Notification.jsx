import { useSelector, useDispatch } from "react-redux"
import { clearNotification } from "../reducers/notification"
import { useEffect } from "react"

const Notification = () => {
	const notification = useSelector((state) => state.notification)
	const dispatch = useDispatch()

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				dispatch(clearNotification())
			}, 5000)
			return () => clearTimeout(timer) // siivoa mahdollinen edellinen timer
		}
	}, [notification, dispatch])

	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
		marginBottom: 10,
	}

	if (!notification) return null

	return <div style={style}>{notification}</div>
}

export default Notification
