import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Users from './components/users';
import blogService from './services/blogs';
import { loginUser , addLoginUser,logOutUser,getAllUsers} from './userReducer';
import './index.css';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import { setNotification } from './notificationReducer';
import { initialBlogs, createBlog } from './bloglistReducer';
import { deleteBlogState } from './bloglistReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';

const Menu = () => {
	const padding = {
		paddingRight: 5,
	}
	return (
		<div>
			<Link style={padding} to="/">
				Home
			</Link>
			<Link style={padding} to="/Users">
				Users
			</Link>
		</div>
	)
}



const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.notification);
  const bloglist = useSelector((state) => state.blogs);
  const loggeduser = useSelector((state) => state.users.loggedUser);
  const allUsers = useSelector((state) => state.users.users);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(addLoginUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initialBlogs());
     dispatch(getAllUsers())}, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(
      loginUser({
        username,
        password,
      })
    );
  };

  const Notification = () => {
    if (notification != null) {
      return <div className="notemessage">{notification}</div>;
    }
  };

  const note = (content) => {
    dispatch(setNotification(content));
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(logOutUser());
    setPassword('');
    setUsername('');
  };
  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const blogObject = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      };

      dispatch(createBlog(blogObject));
      note(`A new blog "${newBlog.title}" by ${newBlog.author} added`);
      setNewBlog({ title: '', author: '', url: '' });
    } catch (error) {
      note('error adding blog');
    }
  };

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };

  const blogList = () => (
    <div>
      <p>{loggeduser.name} logged in</p>
      <button onClick={() => handleLogout()}>log out </button>
      <Togglable buttonLabel="new blog">
        <BlogForm
          addBlog={addBlog}
          newBlog={newBlog}
          handleBlogChange={handleBlogChange}
        />
      </Togglable>
      {bloglist.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={deleteBlogState}
          blogs={bloglist}
          note={note}
        />
      ))}
    </div>
  );

  if (loggeduser === null) {
    return (
      
        
      <div>
        <h1>Blogs</h1>
        <Notification />
        {loginForm()}
      
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <Menu />
      <Routes>
				<Route path="/" element={loggeduser ? blogList() : loginForm()} />
        <Route path="/users" element={<Users users={allUsers} blogs={bloglist}/>}/>

			</Routes>

      
    </div>
  );
};

export default App;
