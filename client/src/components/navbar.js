import React from "react";
import { AdminMenu } from "./Menu/AdminMenu";
import { EmployeeMenu } from "./Menu/EmployeeMenu";
import { UserMenu } from "./Menu/UserMenu";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  if (user?.userType === "superAdmin") {
    return (
      <>
        <AdminMenu />
      </>
    );
  }

  if (user?.userType === "admin") return <EmployeeMenu />;

  return <UserMenu />;
};
