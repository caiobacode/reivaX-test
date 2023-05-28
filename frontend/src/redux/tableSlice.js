import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'table',
  initialState: {
    data: [],
    actualPage: 1,
    clearTable: false
  },
  reducers: {
    setData (state, { payload }) {
      return { ...state, data: payload };
    },
    changePage (state, { payload }) {
      return { ...state, actualPage: payload };
    },
    setClearTable (state, { payload }) {
      return { ...state, clearTable: payload };
    }
  }
});

export const { setData, changePage, setClearTable } = slice.actions;

export const selectTable = state => state.table;

export default slice.reducer;