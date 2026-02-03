import { createSlice } from '@reduxjs/toolkit';
import blogService from './services/blogs';
import { setNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    likeBlogState(state, action) {
      const id = action.payload.id;
      return state
        .map((blog) => (blog.id !== id ? blog : action.payload))
        .sort((a, b) => b.likes - a.likes);
    },
    deleteBlogState(state, action) {
      const id = action.payload;
      return state.filter((a) => a.id !== id);
    },
    commentBlogState(state, action) {
      const id = action.payload.id;
      return state.map((blog) => (blog.id === id ? action.payload : blog));
    },
  },
});

export const {
  setBlogs,
  appendBlog,
  likeBlogState,
  deleteBlogState,
  commentBlogState,
} = blogSlice.actions;

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log('moi', blogs);
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const result = await blogService.create(blog);
      console.log(result);
      dispatch(appendBlog(result));
      dispatch(
        setNotification(`Blog '${blog.title}' by ${blog.author} created`)
      );
    } catch (error) {
      dispatch(setNotification('Missing information'));
    }
  };
};
export default blogSlice.reducer;
