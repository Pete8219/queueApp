import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const Request = () => {
  const { userId } = useSelector((state) => state.userRole);
  const { tickets } = useSelector((state) => state.tickets);
  const visitorRequests = tickets.filter((ticket) => {
    //здесь нужно не фильтровать а запрашивать только те тикеты, которые принадлежат пользователю
    return ticket.visitorId === userId;
  });

  const location = useLocation();

  localStorage.setItem("url", JSON.stringify(location));

  return (
    <div>
      <h4>Мои записи</h4>
      <hr />
      {visitorRequests.length ? (
        visitorRequests.map((item) => {
          return <div>{item.status}</div>;
        })
      ) : (
        <p>
          У вас пока нет созданных записей.{" "}
          <Link to="/request/new">Создать запись?</Link>{" "}
        </p>
      )}
    </div>
  );
};
