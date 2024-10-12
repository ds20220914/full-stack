import { useState } from "react"
import "../index.css"
import blogService from "../services/blogs"

const Blog = ({ blog }) => {
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
				</div>
			)}
		</div>
	)
}

export default Blog
