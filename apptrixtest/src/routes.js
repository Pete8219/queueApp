import React from "react";
import { Routes, Route } from "react-router-dom";
import { App } from "./App";
import { useSelector } from "react-redux";
import { LoginForm } from "./LoginForm";

export const useRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/users" exact />
      <Route path="/user/:id" exact />
      <Route path="/tasks" exact />
      <Route path="/timesheets" exact />
      <Route path="*" element={<App />} />
    </Routes>
  );
};
