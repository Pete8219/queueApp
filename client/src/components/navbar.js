import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AdminMenu } from "./Menu/AdminMenu";
import { EmployeeMenu } from "./Menu/EmployeeMenu";
import { UserMenu } from "./Menu/UserMenu";

export const Navbar = () => {
  const { userType } = useContext(AuthContext);

  const isSuperAdmin = userType === "superAdmin" ? true : false;
  const isAdmin = userType === "admin" ? true : false;

  if (isSuperAdmin) return <AdminMenu />;

  if (isAdmin) return <EmployeeMenu />;

  if (!isSuperAdmin && !isAdmin) return <UserMenu />;
};
