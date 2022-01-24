import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Navbar } from "./navbar";

export const Layout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
