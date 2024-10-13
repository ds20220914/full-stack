import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("<Blog />", () => {
	const mockHandler = vi.fn()
	beforeEach(() => {
		const blog = {
			title: "testi",
			author: "david",
			url: "www.hello.com",
			likes: 0,
			user: {
				username: "david",
				name: "david",
			},
		}

		const container = render(
			<Blog
				blog={blog}
				setBlogs={mockHandler}
				blogs={mockHandler}
				note={mockHandler}
			/>
		)
	})
	test("renders only title and author", () => {
		const title = screen.getByText("testi")

		expect(title).toBeDefined()
	})

	test("renders all info when button pressed", async () => {
		const user = userEvent.setup()
		const button = screen.getByText("View")

		await user.click(button)
		const title = screen.getByText("testi")
		const author = screen.findByText("david")
		const url = screen.getByText(/www.hello.com/)
		const likes = screen.getByText(/likes/)
		expect(title).toBeDefined()
		expect(author).toBeDefined()
		expect(likes).toBeDefined()
		expect(url).toBeDefined()
	})
})
