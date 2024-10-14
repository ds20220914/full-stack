import { render, screen } from "@testing-library/react"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
	const user = userEvent.setup()
	const addBlog = vi.fn()
	const handleBlogChange = vi.fn()
	const newBlog = vi.fn()

	render(
		<BlogForm
			addBlog={addBlog}
			handleBlogChange={handleBlogChange}
			newBlog={newBlog}
		/>
	)

	const input1 = screen.getByPlaceholderText("title")
	const input2 = screen.getByPlaceholderText("author")
	const input3 = screen.getByPlaceholderText("url")
	const sendButton = screen.getByText("create")

	await user.type(input1, "test")
	await user.type(input2, "david")
	await user.type(input3, "www.hello.com")
	addBlog({ title: "test", author: "david", url: "www.hello.com" })

	expect(addBlog.mock.calls).toHaveLength(1)
	expect(addBlog.mock.calls[0][0].title).toBe("test")
	expect(addBlog.mock.calls[0][0].author).toBe("david")
	expect(addBlog.mock.calls[0][0].url).toBe("www.hello.com")
})
