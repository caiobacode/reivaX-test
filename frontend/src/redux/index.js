import { setData, changePage, setClearTable, selectTable, setFilteredDataLength } from "./tableSlice";
import { loginUser, logoutUser, setUserToConnected, selectUser } from "./userSlice";
import { turnOnLoadingScreen, turnOffLoadingScreen, selectLoadingScreen } from "./loadingScreenSlice";
import { turnFiltersWindowOn, turnFiltersWindowOff, applyNewFilters, selectFilters } from "./filtersSlice";

export { 
  loginUser, 
  logoutUser, 
  setUserToConnected, 
  setData, 
  setFilteredDataLength,
  changePage,
  setClearTable,
  turnOnLoadingScreen,
  turnOffLoadingScreen,
  turnFiltersWindowOn,
  turnFiltersWindowOff,
  applyNewFilters,
  selectTable,
  selectUser,
  selectLoadingScreen,
  selectFilters
};