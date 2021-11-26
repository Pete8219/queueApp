import React, { useState, useEffect } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { ListItem } from "./ListItem";
import { formatDate } from "../../../utils/formatDate";
import { Loader } from "../../Loader";
import M from "materialize-css";
import { RecordEdit } from "../RecordEdit/RecordEdit";
import { RecordOverwrite } from "../RecordOverwrite/RecordOverwrite";
import { useSelector } from "react-redux";
import api from "../../../http";

export const List = ({ props }) => {
  const { userId, date, name } = props;
  const { request } = useHttp();
  const [ticketList, setTicketList] = useState([]);
  //const [services, setServices] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isActiveRewrite, setIsActiveRewrite] = useState(false);
  const [reloadList] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.userRole);
  const { services } = useSelector((state) => state.services);

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    if (!name) {
      return;
    }
    const getTickets = async () => {
      setLoading(true);
      try {
        const response = await api.get("/tickets/find", { params: { name } });
        setTicketList(response.data);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };

    getTickets();
  }, [name]);

  useEffect(() => {
    setLoading(true);
    const getTickets = async () => {
      try {
        const response = await api.get("/tickets/ticketlist", {
          params: { userId, date: formatDate(date) },
        });

        setTicketList(response.data);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    getTickets();
  }, [date, userId, reloadList]);

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
        ticket.note = note;
      }
    });
  };

  const editTicketStatus = (_id, status) => {
    ticketList.map((ticket) => {
      if (ticket._id === _id) {
        ticket.status = status;
      }
    });
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
