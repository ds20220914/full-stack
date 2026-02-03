import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationReducer';
import blogReducer from './bloglistReducer';
import userReducer from './userReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    users: userReducer,
  },
});

export default store;
