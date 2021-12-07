import React from "react";
import { TicketsMainPage } from "../../components/Tickets/TicketsMainPage";
import { useSelector } from "react-redux";
import { Loader } from "../../components/Loader";

export const AdminPage = () => {
  const { users } = useSelector((state) => state.users);

  if (!users) {
    return <Loader />;
  }
  return (
    <div>
      <TicketsMainPage />
    </div>
  );
};
