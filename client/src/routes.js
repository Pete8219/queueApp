import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { AdminRoutes } from "./routes/AdminRoutes";
import { EmployeeRoutes } from "./routes/EmployeeRoutes";
import { UnAuthorizeRoutes } from "./routes/UnAuthorizeRoutes";
import { UserRoutes } from "./routes/UserRoutes";

export const useRoutes = (isAuthenticated, userType) => {
  const roles = ["superAdmin"];
  if (isAuthenticated && userType === "superAdmin") {
    return <AdminRoutes />;
  }
  if (isAuthenticated && userType === "admin") {
    return <EmployeeRoutes />;
  }

  if (isAuthenticated && userType === "user") {
    return <UserRoutes />;
  }

  return <UnAuthorizeRoutes />;
};
