import React, { useState, useCallback, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { AdminRoutes } from "./routes/AdminRoutes";
import { EmployeeRoutes } from "./routes/EmployeeRoutes";
import { UnAuthorizeRoutes } from "./routes/UnAuthorizeRoutes";
import { UserRoutes } from "./routes/UserRoutes";

export const useRoutes = () => {
  const { role, isAuthenticated } = useSelector((state) => state);
  if (isAuthenticated && role === "superAdmin") {
    return <AdminRoutes />;
  }
  if (isAuthenticated && role === "admin") {
    return <EmployeeRoutes />;
  }

  if (isAuthenticated && role === "user") {
    return <UserRoutes />;
  }

  if (!isAuthenticated) return <UnAuthorizeRoutes />;
};
