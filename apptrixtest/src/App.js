import "materialize-css";
import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { LoginForm } from "./LoginForm";
import { authenticate, logout } from "./store/authReducer";

import api from "./http";
import { loadUsersFromApi } from "./store/actions/users";

export const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("access")) {
      dispatch(authenticate());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadUsersFromApi());
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <div></div>;
};
