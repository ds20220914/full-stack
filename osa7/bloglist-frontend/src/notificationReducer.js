import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { notification: null },
  reducers: {
    setNotificationState(state, action) {
      state.notification = action.payload;
    },
    clearNotificationState(state) {
      state.notification = null;
    },
  },
});

export const { setNotificationState, setErrorState, clearNotificationState } =
  notificationSlice.actions;

export const setNotification = (content) => {
  return async (dispatch) => {
    dispatch(setNotificationState(content));
    await new Promise((resolve) => setTimeout(resolve, 5000));
    dispatch(clearNotificationState());
  };
};

export default notificationSlice.reducer;
