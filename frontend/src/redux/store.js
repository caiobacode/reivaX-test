import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tableReducer from './tableSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    table: tableReducer
  }
});