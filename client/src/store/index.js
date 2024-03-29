import { createStore, applyMiddleware, combineReducers } from "redux";
import { roleReducer } from "./roleReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userReducer } from "./userReducer";
import { serviceReducer } from "./serviceReducer";
import { categoriesReducer } from "./categoriesReducer";
import { ticketsReducer } from "./ticketsReducer";
import { serviceTypesReducer } from "./serviceTypesReducer";
import { settingsReducer } from "./settingsReducer";
import { statusesReducer } from "./statusesReducer";
import { requestReducer } from "./requestReducer";
import { AuthReducer } from "./AuthReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  userRole: roleReducer,
  users: userReducer,
  services: serviceReducer,
  categories: categoriesReducer,
  tickets: ticketsReducer,
  types: serviceTypesReducer,
  settings: settingsReducer,
  statuses: statusesReducer,
  request: requestReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
