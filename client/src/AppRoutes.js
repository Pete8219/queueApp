import React from "react";
import { useSelector } from "react-redux";

import { AdminRoutes } from "./routes/AdminRoutes";
import { EmployeeRoutes } from "./routes/EmployeeRoutes";
import { UnAuthorizeRoutes } from "./routes/UnAuthorizeRoutes";
import { UserRoutes } from "./routes/UserRoutes";

export const AppRoutes = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated && user?.userType === "superAdmin") {
    return <AdminRoutes />;
  }
  if (isAuthenticated && user?.userType === "admin") {
    return <EmployeeRoutes />;
  }

  if (isAuthenticated && user?.userType === "user") {
    return <UserRoutes />;
  }

  if (!isAuthenticated) return <UnAuthorizeRoutes />;
};
