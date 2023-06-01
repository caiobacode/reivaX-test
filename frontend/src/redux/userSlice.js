import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
  },
  reducers: {
    loginUser(state, { payload }) {
      return { ...state, ...payload };
    },
    logoutUser() {
      return { username: '', password: '' };
    },
  },
});

export const { loginUser, setUserToConnected, logoutUser } = slice.actions;

export const selectUser = (state) => state.user;

export default slice.reducer;
