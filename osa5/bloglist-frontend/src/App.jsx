import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import "./index.css"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)
	const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" })

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const blogs = await blogService.getAll()
				setBlogs(blogs)
			} catch (error) {
				console.error("Failed to fetch blogs:", error)
			}
		}
		fetchBlogs()
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password,
			})
			setUser(user)
			blogService.setToken(user.token)
			window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
			setUsername("")
			setPassword("")
		} catch (exception) {
			setMessage("wrong credentials")
			console.log(exception)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const Notification = (props) => {
		console.log(props.message)
		if (props.message === null) {
			return null
		}
		if (props.message !== null) {
			return <div className="notemessage">{props.message.content}</div>
		}
	}

	const note = (content) => {
		setMessage({ content })
		setTimeout(() => {
			setMessage(null)
		}, 5000)
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)

	const handleLogout = () => {
		window.localStorage.removeItem("loggedBlogAppUser")
		setUser(null)
		setMessage("Logged out")
	}
	const addBlog = async (event) => {
		event.preventDefault()

		try {
			const blogObject = {
				title: newBlog.title,
				author: newBlog.author,
				url: newBlog.url,
			}

			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			note(`A new blog "${newBlog.title}" by ${newBlog.author} added`)
			setNewBlog({ title: "", author: "", url: "" })
		} catch (error) {
			note("error adding blog")
		}
	}

	const handleBlogChange = (event) => {
		setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
	}
	const blogForm = () => (
		<form onSubmit={addBlog}>
			<div>
				title:
				<input
					type="text"
					value={newBlog.title}
					name="title"
					onChange={handleBlogChange}
				/>
			</div>
			<div>
				author:
				<input
					type="text"
					value={newBlog.author}
					name="author"
					onChange={handleBlogChange}
				/>
			</div>
			<div>
				url:
				<input
					type="text"
					value={newBlog.url}
					name="url"
					onChange={handleBlogChange}
				/>
			</div>
			<button type="submit">create</button>
		</form>
	)

	const blogList = () => (
		<div>
			<p>{user.name} logged in</p>
			<button onClick={() => handleLogout()}>log out </button>
			{blogForm()}
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)

	return (
		<div>
			<h1>Blogs</h1>

			<Notification message={message} />
			{!user ? loginForm() : blogList()}
		</div>
	)
}

export default App
