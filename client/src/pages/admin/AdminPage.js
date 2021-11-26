import React, { useContext } from "react";

import { StaffProfile } from "../../components/Staff/StaffProfile";
import { TicketsMainPage } from "../../components/Tickets/TicketsMainPage";
import { useSelector } from "react-redux";
import { Loader } from "../../components/Loader";

export const AdminPage = () => {
  const { users } = useSelector((state) => state.users);
  const { userId } = useSelector((state) => state.userRole);

  if (!users) {
    return <Loader />;
  }
  return (
    <div>
      {users && <StaffProfile />}
      <TicketsMainPage />
    </div>
  );
};
