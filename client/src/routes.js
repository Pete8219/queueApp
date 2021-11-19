import React, { useState, useCallback, useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { AdminRoutes } from "./routes/AdminRoutes";
import { EmployeeRoutes } from "./routes/EmployeeRoutes";
import { UnAuthorizeRoutes } from "./routes/UnAuthorizeRoutes";
import { UserRoutes } from "./routes/UserRoutes";
import StateContext from "./context/StateContext";
import DispatchContext from "./context/DispatchContext";
import { useHttp } from "./hooks/http.hook";

export const useRoutes = (isAuth, role) => {
  const appDispatch = useContext(DispatchContext);

  if (isAuth && role === "superAdmin") {
    return <AdminRoutes />;
  }
  if (isAuth && role === "admin") {
    return <EmployeeRoutes />;
  }

  if (isAuth && role === "user") {
    return <UserRoutes />;
  }

  return <UnAuthorizeRoutes />;
};
