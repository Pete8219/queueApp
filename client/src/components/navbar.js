import React, { useContext } from "react";
import { AdminMenu } from "./Menu/AdminMenu";
import { EmployeeMenu } from "./Menu/EmployeeMenu";
import { UserMenu } from "./Menu/UserMenu";
import StateContext from "../context/StateContext";

export const Navbar = () => {
  const appState = useContext(StateContext);
  const { role } = appState;

  const isSuperAdmin = role === "superAdmin" ? true : false;
  const isAdmin = role === "admin" ? true : false;

  if (role === "superAdmin") return <AdminMenu />;

  if (role === "admin") return <EmployeeMenu />;

  return <UserMenu />;
};
