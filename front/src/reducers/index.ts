import { combineReducers } from "redux";
import tableReducer from "./tableReducer";

export default combineReducers({
  tableData: tableReducer,
});
