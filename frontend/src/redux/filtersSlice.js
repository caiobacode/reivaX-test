import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'filters',
  initialState: {
    showFiltersWindow: false,
    typeFilter: ['type1', 'type2', 'type3'],
    param1Filter: {
      lessThanNumber: null,
      greaterThanNumber: null
    },
    param2Filter: {
      lessThanNumber: null,
      greaterThanNumber: null
    }
  },
  reducers: {
    turnFiltersWindowOn (state, { payload }) {
      return { ...state, showFiltersWindow: true};
    },
    turnFiltersWindowOff (state, { payload }) {
      return { ...state, showFiltersWindow: false};
    },
    applyNewFilters (state, { payload }) {
      return { ...state, ...payload }
    }
  }
});

export const { turnFiltersWindowOn, turnFiltersWindowOff, applyNewFilters } = slice.actions;

export const selectFilters = state => state.filters;

export default slice.reducer;