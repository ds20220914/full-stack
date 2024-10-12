import { useState } from "react"
import "../index.css"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs, blogs, note }) => {
	const [visible, setVisible] = useState(false)
	const [likes, setLikes] = useState(blog.likes)

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const handleLikes = async () => {
		const id = blog.id
		const response = await blogService.like(id, blog, likes)
		setLikes(response.likes)
	}

	const handleDelete = async () => {
		const id = blog.id
		const confirm = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
		if (confirm) {
			const response = await blogService.deleteBlog(id)
			console.log(response)
			if (response.status === 204) {
				setBlogs(blogs.filter((b) => b.id !== blog.id))
				note("delete successfully")
			} else {
				note("Blog deletation wrong, you can only delete your own blogs")
			}
		}
	}

	return (
		<div className="blogStyle">
			{blog.title}
			<button onClick={toggleVisibility}>{visible ? "Hide" : "View"}</button>

			{visible && (
				<div>
					{blog.author}
					<br />
					{blog.url}
					<br />
					likes:{likes}
					<button onClick={handleLikes}>like</button>
					<br />
					<button onClick={handleDelete}>delete</button>
				</div>
			)}
		</div>
	)
}

export default Blog
