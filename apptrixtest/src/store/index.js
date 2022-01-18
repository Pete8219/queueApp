import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer } from "./authReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
});
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
