import { createSlice } from '@reduxjs/toolkit';
import loginService from './services/login';
import blogService from './services/blogs';
import userService from './services/user';
import { setNotification } from './notificationReducer';

const userSlice = createSlice({
  name: 'users',
  initialState: { loggedUser: null, users: [] },
  reducers: {
    addLoginUser(state, action) {
      state.loggedUser = action.payload;
    },
    logOutUser(state) {
      state.loggedUser = null;
    },
    allUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const { addLoginUser, logOutUser, allUsers } = userSlice.actions;

export const loginUser = (userObject) => {
  return async (dispatch) => {
    try {
      const response = await loginService.login(userObject);
      const user = response;
      dispatch(addLoginUser(user));
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (err) {
      console.log('error');
      dispatch(setNotification('Invalid credentials'));
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getUsers();
      dispatch(allUsers(users));
    } catch (error) {
      dispatch(setNotification('error'));
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch(logOutUser());
    window.localStorage.removeItem('loggedUser');
  };
};

export default userSlice.reducer;
