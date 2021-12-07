/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from "react";

import styles from "./list.module.css";

export const ListItem = ({ ticket, i, handler, rewrite, statusHandler }) => {
  const [status, setStatus] = useState(ticket.status);

  const statusChange = (event) => {
    const selIndex = event.target.options.selectedIndex;
    const text = event.target.options[selIndex].outerText;
    const statusValue = event.target.options[selIndex].dataset.status;

    setStatus(text);
    statusHandler(ticket._id, statusValue);
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
      <td>{new Date(ticket.date).toLocaleDateString()}</td>

      <td>
        {new Date(ticket.date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
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
