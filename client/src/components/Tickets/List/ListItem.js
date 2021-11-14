/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useAuth } from "../../../hooks/auth.hook";
import { useHttp } from "../../../hooks/http.hook";
import { useMessage } from "../../../hooks/message.hook";
import styles from "./list.module.css";

export const ListItem = ({ ticket, i, handler, rewrite, statusHandler }) => {
  const { token } = useAuth(AuthContext);
  const { request } = useHttp();
  const message = useMessage();

  const [status, setStatus] = useState(ticket.status);

  const statusChange = async (event) => {
    const selIndex = event.target.options.selectedIndex;
    const text = event.target.options[selIndex].outerText;
    const statusValue = event.target.options[selIndex].dataset.status;

    setStatus(text);
    const body = {
      status: statusValue,
    };

    try {
      const data = await request(
        `/tickets/status/${ticket._id}`,
        "PATCH",
        body,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      message(text);

      statusHandler(ticket._id, statusValue);
    } catch (e) {}
  };

  const fullName = `${ticket.firstname} ${ticket.surname} ${ticket.lastname} `;

  const statusObject = {
    pending: "В работе",
    consultation: "Исполнено(проведена консультация)",
    statement: "Исполнено(принято заявление)",
    notStatement: "Исполнено(заявитель отказался подавать заявление)",
    refusal: "Отказ от записи",
    notShow: "Не явился",
  };

  const items = [];

  for (let key in statusObject) {
    items.push(
      <option key={key} data-status={key} value={statusObject[key]}>
        {statusObject[key]}
      </option>
    );
  }

  return (
    <tr>
      <td>{i + 1}</td>
      <td>
        <a className={styles.editLink} onClick={() => handler(ticket._id)}>
          {" "}
          {fullName.toUpperCase()}
        </a>
      </td>
      <td>{ticket.phone || ""}</td>
      <td>{ticket.date.slice(0, 10).split("-").reverse().join(".")}</td>

      <td>{new Date(ticket.date).toLocaleTimeString().slice(0, 5)}</td>
      <td>
        <select
          defaultValue={statusObject[status]}
          className="browser-default"
          data-ticket-id={ticket._id}
          onChange={statusChange}
        >
          {items}
        </select>
      </td>
      <td>
        <button
          className={["btn-flat btn darken red", styles.Button].join(" ")}
          onClick={() => rewrite(ticket._id)}
        >
          Перезаписать
        </button>
      </td>
    </tr>
  );
};
