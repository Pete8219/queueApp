import React, { useState, useEffect } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { ListItem } from "./ListItem";
import { formatDate } from "../../../utils/formatDate";
import { Loader } from "../../Loader";
import { EditForm } from "../../../OldScripts/EditForm/EditForm";
import M from "materialize-css";
import { RewriteForm } from "../RewriteForm/RewriteForm";
import { OverwriteClient } from "../../OverwriteClient/OverwriteClient";
import { useHistory } from "react-router";
import { RecordEdit } from "../RecordEdit/RecordEdit";
import { RecordOverwrite } from "../RecordOverwrite/RecordOverwrite";

export const List = ({ props }) => {
  const history = useHistory();
  const { userId, token, date, name } = props;
  const { loading, request } = useHttp();
  const [ticketList, setTicketList] = useState([]);
  const [services, setServices] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isActiveRewrite, setIsActiveRewrite] = useState(false);
  const [reloadList, setReloadList] = useState(false);

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await request("/services/", "GET", null, {});
        setServices(data);
      } catch (error) {}
    };

    fetchServices();
  }, [request]);

  useEffect(() => {
    if (!name) {
      return;
    }
    const getTickets = async () => {
      try {
        const data = await request(`/tickets/find/${name}`, "GET", null, {
          Authorization: `Bearer ${token}`,
        });
        setTicketList(data);
      } catch (error) {}
    };

    getTickets();
  }, [name, request, token]);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const data = await request(
          `/tickets/ticketlist/${userId}/${formatDate(date)}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );

        setTicketList(data);
      } catch (e) {}
    };

    getTickets();
  }, [date, userId, request, token, reloadList]);

  const filterData = (ticketId) => {
    const filterData = ticketList.filter((item) => item._id === ticketId);
    //localStorage.setItem("ticketId", JSON.stringify(filterData));
    localStorage.setItem("clientData", JSON.stringify(filterData));
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

  const openRewriteForm = (id) => {
    filterData(id);
    setIsActiveRewrite(true);
  };

  const onClose = () => {
    setIsActive(false);
    setIsActiveRewrite(false);
    localStorage.removeItem("clientData");
    //localStorage.removeItem("ticketId");
  };

  const onWrite = () => {};

  const getReload = () => {
    setReloadList((prev) => !prev);
  };

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
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        {/* {isActive && <EditForm props={{ closeForm, editTicketList }} />} */}
        {isActive && <RecordEdit props={{ onClose }} />}
        {isActiveRewrite && (
          <RecordOverwrite props={{ onClose, onWrite, services }} />
        )}
        {/* <RewriteForm
            close={onClose}
            serviceList={services}
            reload={getReload}
          /> */}
      </div>
    </div>
  );
};
