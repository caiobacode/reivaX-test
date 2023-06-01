import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showFiltersWindow: false,
  typeFilter: ['type1', 'type2', 'type3'],
  param1Filter: {
    lessThanNumber: null,
    greaterThanNumber: null,
  },
  param2Filter: {
    lessThanNumber: null,
    greaterThanNumber: null,
  },
};

export const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    turnFiltersWindowOn(state) {
      return { ...state, showFiltersWindow: true };
    },
    turnFiltersWindowOff(state) {
      return { ...state, showFiltersWindow: false };
    },
    applyNewFilters(state, { payload }) {
      return { ...state, ...payload };
    },
    clearFilters() {
      return initialState;
    },
  },
});

export const {
  turnFiltersWindowOn, turnFiltersWindowOff, applyNewFilters, clearFilters,
} = slice.actions;

export const selectFilters = (state) => state.filters;

export default slice.reducer;
