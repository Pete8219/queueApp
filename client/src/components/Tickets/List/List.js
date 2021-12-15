import React, { useState, useEffect } from "react";
import { ListItem } from "./ListItem";
import { Loader } from "../../Loader";
import M from "materialize-css";
import { RecordEdit } from "../RecordEdit/RecordEdit";
import { RecordOverwrite } from "../RecordOverwrite/RecordOverwrite";
import { useSelector, useDispatch } from "react-redux";
import { useMessage } from "../../../hooks/message.hook";

import { updateTicketStatus } from "../../../store/actions/tickets";

export const List = ({ props }) => {
  const { date, name } = props;
  const message = useMessage();

  const [isActive, setIsActive] = useState(false);
  const [isActiveRewrite, setIsActiveRewrite] = useState(false);

  const { services } = useSelector((state) => state.services);
  const { tickets, loading } = useSelector((state) => state.tickets);
  const [ticketList, setTicketList] = useState([]);
  const [clientName, setClientName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    setClientName(name);
  }, [name]);

  useEffect(() => {
    if (!clientName) {
      return;
    }

    const ticketsByName = [];
    tickets.forEach((ticket) => {
      if (ticket.firstname.includes(name)) {
        ticketsByName.push(ticket);
      }
    });

    setTicketList(ticketsByName);
  }, [clientName, name, tickets]);

  useEffect(() => {
    const selectedDate = new Date(date);
    const ticketsByDate = [];
    tickets.forEach((ticket) => {
      const ticketDate = new Date(ticket.date);

      if (
        ticketDate.toLocaleDateString() === selectedDate.toLocaleDateString()
      ) {
        ticketsByDate.push(ticket);
      }
    });

    setTicketList(ticketsByDate);
  }, [date, tickets]);

  const filterData = (ticketId) => {
    const clientData = ticketList.filter((item) => item._id === ticketId);

    localStorage.setItem("clientData", JSON.stringify(clientData));
  };

  const changeItem = (id) => {
    filterData(id);
    setIsActive(true);
  };

  const editTicketList = (_id, note) => {
    ticketList.map((ticket) => {
      if (ticket._id === _id) {
        return (ticket.note = note);
      } else {
        return false;
      }
    });
  };

  const editTicketStatus = (_id, status) => {
    dispatch(updateTicketStatus({ _id, status }));
    if (!loading) {
      message("Статус изменен");
    }
  };

  const openRewriteForm = (id) => {
    filterData(id);
    setIsActiveRewrite(true);
  };

  const onClose = () => {
    setIsActive(false);
    setIsActiveRewrite(false);
    localStorage.removeItem("clientData");
  };

  const onWrite = () => {};

  if (loading) {
    <Loader />;
  }

  if (!tickets.length) {
    return <Loader />;
  }

  if (!ticketList.length) {
    return (
      <div>
        <h1>Записей не найдено</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="row col s12">
        <div className="card" style={{ padding: "20px" }}>
          <table className="striped">
            <thead style={{ backgroundColor: "c2c2c2" }}>
              <tr>
                <th>#</th>
                <th>Посетитель</th>
                <th>Телефон</th>
                <th>Дата приема</th>
                <th>Время</th>
                <th>Статус</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {ticketList.map((ticket, index) => {
                return (
                  <ListItem
                    key={ticket._id}
                    ticket={ticket}
                    i={index}
                    handler={changeItem}
                    rewrite={openRewriteForm}
                    statusHandler={editTicketStatus}
                  />
                );
              })}
            </tbody>
          </table>
        </div>

        {isActive && <RecordEdit props={{ onClose, editTicketList }} />}
        {isActiveRewrite && (
          <RecordOverwrite props={{ onClose, onWrite, services }} />
        )}
      </div>
    </div>
  );
};
