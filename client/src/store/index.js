import { createStore, applyMiddleware, combineReducers } from "redux";
import { roleReducer } from "./roleReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userReducer } from "./userReducer";
import { serviceReducer } from "./serviceReducer";

const rootReducer = combineReducers({
  userRole: roleReducer,
  users: userReducer,
  services: serviceReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
