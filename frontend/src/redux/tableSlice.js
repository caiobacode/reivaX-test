import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'table',
  initialState: {
    data: [],
    actualPage: 1
  },
  reducers: {
    setData (state, { payload }) {
      return { ...state, data: payload };
    },
    changePage (state, { payload }) {
      return { ...state, actualPage: payload };
    }
  }
});

export const { setData, changePage } = slice.actions;

export const selectTable = state => state.table;

export default slice.reducer;