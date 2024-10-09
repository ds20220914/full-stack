const _ = require("lodash")

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	return blogs.reduce((favorite, blog) => {
		return blog.likes > favorite.likes ? blog : favorite
	})
}

const mostBlogs = (blogs) => {
	const count = _.countBy(blogs, "author")
	const mostCount = _.maxBy(Object.keys(count), (author) => count[author])
	const numbers = count[mostCount]
	const guy = { author: mostCount, blogs: numbers }
	return guy
}

const mostLikes = (blogs) => {
	const list = blogs.reduce((result, blog) => {
		result[blog.author] = (result[blog.author] || 0) + blog.likes
		return result
	}, {})

	const mostCount = _.maxBy(Object.keys(list), (author) => list[author])
	number = list[mostCount]
	return { author: mostCount, likes: number }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
