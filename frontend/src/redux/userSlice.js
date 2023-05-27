import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    password: '',
    isConnected: false,
  },
  reducers: {
    loginUser (state, { payload }) {
      return {...state, ...payload};
    },
    setUserToConnected (state) {
      if (!state.isConnected) {
        return {...state, isConnected: true}
      }
    },
    logoutUser () { 
      return { username: '', password: '', isConnected: false}; 
    }
  }
});

export const { loginUser, setUserToConnected, logoutUser } = slice.actions;

export const selectUser = state => state.user;

export default slice.reducer;