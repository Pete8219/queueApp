import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRoutes } from "./routes";
import { useHttp } from "./hooks/http.hook";
import { Navbar } from "../src/components/navbar";
import { Loader } from "../src/components/Loader";
import "materialize-css";
import "react-datepicker/dist/react-datepicker.css";
import { logout } from "./store/roleReducer";
import { checkToken } from "./store/asyncActions";

export const Main = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, role, isFetching } = useSelector((state) => state);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("access_token"));

    if (!token) {
      return;
    }
    if (token === "undefined") {
      localStorage.removeItem("access_token");
      return dispatch(logout());
    }
    dispatch(checkToken(token));
  }, []);

  const routes = useRoutes(isAuthenticated, role);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <Router>
      {isAuthenticated && <Navbar />} <div>{routes}</div>
    </Router>
  );
};
