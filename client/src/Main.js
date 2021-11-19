import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { Navbar } from "../src/components/navbar";
import { Loader } from "../src/components/Loader";
import "materialize-css";
import "react-datepicker/dist/react-datepicker.css";

import StateContext from "./context/StateContext";

export const Main = () => {
  const appState = useContext(StateContext);
  const { isAuthenticated, role } = appState;

  const routes = useRoutes(isAuthenticated, role);

  /*   if (!ready) {
        return <Loader />;
      } */

  return (
    /*     <AuthContext.Provider
          value={{
            token,
            userId,
            userType,
            login,
            logout,
            isAuthenticated,
          }}
        > */

    <Router>
      {isAuthenticated && <Navbar />}

      <div>{routes}</div>
    </Router>
  );
};
