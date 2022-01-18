import "materialize-css";
import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { LoginForm } from "./LoginForm";
import { authenticate, logout } from "./store/authReducer";
import axios from "axios";

export const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("access")) {
      dispatch(authenticate());
    }
  }, []);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div>
      <nav>
        <Link to="/users">Пользователи</Link>
        <Link to="tasks">Задачи</Link>
      </nav>
      <Outlet />
    </div>
  );
};
