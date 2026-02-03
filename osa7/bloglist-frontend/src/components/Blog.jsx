import { useState } from 'react';
import '../index.css';
import blogService from '../services/blogs';
import { likeBlogState, deleteBlogState } from '../bloglistReducer';
import { useDispatch } from 'react-redux';
import { setNotification } from '../notificationReducer';

const Blog = ({ blog, setBlogs, note }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikes = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      };
      dispatch(likeBlogState(updatedBlog));
    } catch (exception) {
      dispatch(setNotification('Error'));
    }
  };

  const handleDelete = async () => {
    const id = blog.id;
    const confirm = window.confirm(
      `remove blog ${blog.title} by ${blog.author}`
    );
    if (confirm) {
      const response = await blogService.deleteBlog(id);
      console.log(response);
      if (response.status === 204) {
        dispatch(deleteBlogState(id));
        note('delete successfully');
      } else {
        note('Blog deletation wrong, you can only delete your own blogs');
      }
    }
  };

  return (
    <div className="blogStyle">
      {blog.title}
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>

      {visible && (
        <div>
          {blog.author}
          <br />
          {blog.url}
          <br />
          <div className="blog">likes:{blog.likes}</div>
          <button onClick={() => handleLikes(blog)}>like</button>
          <br />
          <button onClick={handleDelete}>delete</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
