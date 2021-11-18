import React, { useContext } from "react";
import { useAuth } from "../../hooks/auth.hook";
import { Loader } from "../../components/Loader";
import { StaffProfile } from "../../components/Staff/StaffProfile";
import { TicketsMainPage } from "../../components/Tickets/TicketsMainPage";
import { AuthContext } from "../../context/AuthContext";

export const AdminPage = () => {
  const { ready } = useAuth();
  const { userType } = useContext(AuthContext);

  if (!ready) {
    return <Loader />;
  }

  return (
    <div>
      <StaffProfile />
      <TicketsMainPage />
    </div>
  );
};
