import React from "react";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { App } from "../App";
import { AuthPage } from "../pages/admin/AuthPage";
import { routes as UserRoutes } from "../routes/UserRoutes";

export const Layout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const userRoutes = useRoutes(UserRoutes);

  if (!isAuthenticated) {
    return <AuthPage />;
  }
  return <div>{userRoutes}</div>;
};
