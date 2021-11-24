import { createStore, applyMiddleware } from "redux";
import { roleReducer } from "./roleReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store = createStore(
  roleReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
