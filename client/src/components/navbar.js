import React, { useContext } from "react";
import { AdminMenu } from "./Menu/AdminMenu";
import { EmployeeMenu } from "./Menu/EmployeeMenu";
import { UserMenu } from "./Menu/UserMenu";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { role } = useSelector((state) => state.userRole);
  /* 
  const isSuperAdmin = role === "superAdmin" ? true : false;
  const isAdmin = role === "admin" ? true : false; */

  if (role === "superAdmin") return <AdminMenu />;

  if (role === "admin") return <EmployeeMenu />;

  return <UserMenu />;
};
