import React, { useState, useEffect, useReducer, useContext } from "react";

import { Main } from "./Main";

import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "../src/components/navbar";
import { Loader } from "../src/components/Loader";
import "materialize-css";
import "react-datepicker/dist/react-datepicker.css";

import StateContext from "./context/StateContext";
import DispatchContext from "./context/DispatchContext";

/* const initialState = {
  isAuthenticated: Boolean(localStorage.getItem("userData")),
  role: null,
  userId: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        isAuthenticated: true,
        role: action.payload.role,
        userId: action.payload.userId,
      };
    case "logout":
      return {
        isAuthenticated: false,
        role: null,
        userId: null,
      };
    default:
      return state;
  }
} */

function App() {
  //const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Main />;
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
