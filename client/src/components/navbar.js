import React from "react";
import { AdminMenu } from "./Menu/AdminMenu";
import { EmployeeMenu } from "./Menu/EmployeeMenu";
import { UserMenu } from "./Menu/UserMenu";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { role } = useSelector((state) => state.userRole);

  if (role === "superAdmin") {
    return (
      <>
        <AdminMenu />
      </>
    );
  }

  if (role === "admin") return <EmployeeMenu />;

  return <UserMenu />;
};
