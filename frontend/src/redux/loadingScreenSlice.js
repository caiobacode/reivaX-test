import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'loadingScreen',
  initialState: true,
  reducers: {
    turnOnLoadingScreen (state, { payload }) {
      return true;
    },
    turnOffLoadingScreen (state, { payload }) {
      return false;
    }
  }
});

export const { turnOnLoadingScreen, turnOffLoadingScreen } = slice.actions;

export const selectLoadingScreen= state => state.loadingScreen;

export default slice.reducer;