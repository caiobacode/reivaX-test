import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tableReducer from './tableSlice';
import loadingScreenReducer from './loadingScreenSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    table: tableReducer,
    loadingScreen: loadingScreenReducer
  }
});