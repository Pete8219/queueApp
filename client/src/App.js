import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";

import { AuthContext } from "./context/AuthContext";
import { Navbar } from "../src/components/navbar";
import { Loader } from "../src/components/Loader";
import "materialize-css";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const { login, logout, token, userId, userType, ready, exp } = useAuth();

  //Где то здесь надо сделать отслеживание валидности Токена

  setInterval(() => {
    if (Date.now() === exp) {
      alert("Сессия окончена");
    }
  }, 1000);

  const isAuthenticated = !!token;

  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        userType,
        login,
        logout,
        isAuthenticated,
        exp,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}

        <div>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
