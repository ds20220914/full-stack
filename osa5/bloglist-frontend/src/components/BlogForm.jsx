const BlogForm = ({ addBlog, handleBlogChange, newBlog }) => (
	<form onSubmit={addBlog}>
		<div className="title">
			title:
			<input
				type="text"
				value={newBlog.title}
				name="title"
				onChange={handleBlogChange}
				placeholder="title"
				data-testid="title"
			/>
		</div>
		<div>
			author:
			<input
				type="text"
				value={newBlog.author}
				name="author"
				onChange={handleBlogChange}
				placeholder="author"
				data-testid="author"
			/>
		</div>
		<div>
			url:
			<input
				type="text"
				value={newBlog.url}
				name="url"
				onChange={handleBlogChange}
				placeholder="url"
				data-testid="url"
			/>
		</div>
		<button type="submit">create</button>
	</form>
)
export default BlogForm
