const BlogForm = ({ addBlog, handleBlogChange, newBlog }) => (
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
export default BlogForm
