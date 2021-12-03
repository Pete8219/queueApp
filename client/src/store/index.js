import { createStore, applyMiddleware, combineReducers } from "redux";
import { roleReducer } from "./roleReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userReducer } from "./userReducer";
import { serviceReducer } from "./serviceReducer";
import { categoriesReducer } from "./categoriesReducer";

const rootReducer = combineReducers({
  userRole: roleReducer,
  users: userReducer,
  services: serviceReducer,
  categories: categoriesReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
