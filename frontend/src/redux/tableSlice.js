import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'table',
  initialState: {
    data: [],
    filteredDataLength: 0,
    actualPage: 1,
    clearTable: false,
  },
  reducers: {
    setData(state, { payload }) {
      return { ...state, data: payload };
    },
    setFilteredDataLength(state, { payload }) {
      return { ...state, filteredDataLength: payload };
    },
    changePage(state, { payload }) {
      return { ...state, actualPage: payload };
    },
    setClearTable(state, { payload }) {
      return { ...state, clearTable: payload };
    },
  },
});

export const {
  setData,
  changePage,
  setClearTable,
  setFilteredDataLength,
} = slice.actions;

export const selectTable = (state) => state.table;

export default slice.reducer;
