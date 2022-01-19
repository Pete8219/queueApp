import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer } from "./authReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { usersReducer } from "./usersReducer";
import { taskReducer } from "./taskReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  tasks: taskReducer,
});
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
