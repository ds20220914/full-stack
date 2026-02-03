import ReactDOM from "react-dom/client"
import App from "./App"
import notificationReducer from "./notificationReducer"
import bloglistReducer from "./bloglistReducer"
import { combineReducers } from "redux"

const reducer = combineReducers({
	notification: notificationReducer,
	blogs: bloglistReducer,
})
const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>,
)
