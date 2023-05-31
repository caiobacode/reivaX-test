import { setData, changePage, setClearTable, selectTable } from "./tableSlice";
import { loginUser, logoutUser, setUserToConnected, selectUser } from "./userSlice";
import { turnOnLoadingScreen, turnOffLoadingScreen, selectLoadingScreen } from "./loadingScreenSlice";

export { 
  loginUser, 
  logoutUser, 
  setUserToConnected, 
  setData, 
  changePage,
  setClearTable,
  turnOnLoadingScreen,
  turnOffLoadingScreen,
  selectTable,
  selectUser,
  selectLoadingScreen
};