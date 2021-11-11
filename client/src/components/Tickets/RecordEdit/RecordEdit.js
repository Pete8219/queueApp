import React, { useState, useContext, useEffect } from "react";
import { ClientForm } from "../../ClientForm/ClientForm";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import styles from "./recordEdit.module.css";
import { FormFooter } from "../../FormFooter/FormFooter";

export const RecordEdit = ({ props }) => {
  const clientData = JSON.parse(localStorage.getItem("clientData"));
  const { onClose } = props;
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const {
    firstname,
    lastname,
    surname,
    email,
    phone,
    note,
    _id,
    user,
    date,
    service,
    status,
  } = clientData[0];

  const [form, seForm] = useState({
    firstname,
    lastname,
    surname,
    email,
    phone,
  });
  const [serviceTitle, setServiceTitle] = useState([]);
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    const serviceName = async function () {
      try {
        const getServiceName = await request(
          `/services/getTitle/${service}`,
          "GET",
          null,
          { Authorization: `BEARER ${token}` }
        );
        setServiceTitle(getServiceName);
      } catch (error) {}
    };
    serviceName();
  }, []);

  useEffect(() => {
    const getTicket = async () => {
      try {
        const data = await request(`/tickets/${_id}`, "GET", null, {
          Authorization: `BEARER ${token}`,
        });
        setTicket(data);
      } catch (error) {}
    };
    getTicket();
  }, []);

  const onWrite = () => {};

  return (
    <div className={styles.popup}>
      <div className={styles.MainContainer}>
        <div className={styles.recordContent}>
          <h4 className={styles.recordHeader}>Редактируем запись</h4>
          <h5>
            Статус заявления :{" "}
            <span
              style={{
                fontSize: "0.8em",

                color: "green",
              }}
            >
              {status}
            </span>
          </h5>

          <ClientForm props={{ form }} />
          <h5>Данные об услуге</h5>
          <h6 style={{ textDecoration: "underline" }}>
            Наименование услуги :{" "}
          </h6>
          <p>{serviceTitle.title}</p>
          <h6 style={{ textDecoration: "underline" }}>Тип услуги:</h6>
          <p>
            {" "}
            {ticket.serviceType === "consultation"
              ? "Консультация"
              : "Подача документов"}
          </p>

          <h5>Дата и время записи</h5>
          <p>
            <p>Дата: {new Date(date).toLocaleDateString()}</p>
            <p>Время: {new Date(date).toLocaleTimeString().slice(0, 5)}</p>
          </p>
          <h5> Данные о сотруднике</h5>
          <h6 style={{ textDecoration: "underline" }}></h6>
          <p>{user.name}</p>
          <p>кабинет № {user.cabinet}</p>
          <h5>Примечания:</h5>
          <small>в поле ниже оставьте свои замечания к данной заявке</small>
          <p>
            <div class="row">
              <div class="input-field col s12">
                <textarea
                  id="textarea2"
                  class="materialize-textarea"
                  data-length="120"
                  name="note"
                  value={note}
                ></textarea>
                <label for="Поле для примечаний"></label>
              </div>
            </div>
          </p>
          <FormFooter props={{ onClose, onWrite }} />
        </div>
      </div>
    </div>
  );
};
