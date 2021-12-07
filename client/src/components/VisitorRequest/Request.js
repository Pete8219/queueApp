import React from "react";
import { useSelector } from "react-redux";

export const Request = () => {
  const { userId } = useSelector((state) => state.userRole);
  const { tickets } = useSelector((state) => state.tickets);
  const visitorRequests = tickets.filter(
    (ticket) => ticket.visitorId === userId
  );

  return (
    <div>
      <h4>Мои заявки</h4>
      <hr />
      {visitorRequests.length ? (
        visitorRequests.map((item) => {
          <div>{item.status}</div>;
        })
      ) : (
        <p>У вас пока нет созданных заявок</p>
      )}
    </div>
  );
};
