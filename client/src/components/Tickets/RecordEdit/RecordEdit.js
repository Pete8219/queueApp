import React, { useState, useContext, useEffect } from "react";
import { ClientForm } from "../../ClientForm/ClientForm";
import { useHttp } from "../../../hooks/http.hook";
import { useMessage } from "../../../hooks/message.hook";
import { AuthContext } from "../../../context/AuthContext";
import styles from "./recordEdit.module.css";
import { FormFooter } from "../../FormFooter/FormFooter";

export const RecordEdit = ({ props }) => {
  const clientData = JSON.parse(localStorage.getItem("clientData"));
  const { onClose, editTicketList } = props;
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const message = useMessage();

  const {
    firstname,
    lastname,
    surname,
    email,
    phone,
    note: ticketNote,
    _id,
    user,
    date,
    service,
    serviceType,
    status,
  } = clientData[0];

  const [form] = useState({
    firstname,
    lastname,
    surname,
    email,
    phone,
  });
  const [serviceTitle, setServiceTitle] = useState([]);
  const [note, setNote] = useState(ticketNote);

  const statusObject = {
    pending: "В работе",
    consultation: "Исполнено(проведена консультация)",
    statement: "Исполнено(принято заявление)",
    notStatement: "Исполнено(заявитель отказался подавать заяаление)",
    refusal: "Отказ от записи",
    notShow: "Не явился",
  };

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
  }, [request, token, service]);

  const onWrite = async () => {
    try {
      const data = await request(
        `/tickets/notes/${_id}`,
        "PATCH",
        { note },
        { Authorization: `Bearer ${token}` }
      );

      editTicketList(_id, note);
      message(data.message);
    } catch (error) {}

    onClose();
  };

  document.addEventListener("keydown", function (event) {
    if (event.code === "Escape") {
      onClose();
    }
  });

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
              {statusObject[status]}
            </span>
          </h5>

          <ClientForm props={{ form }} />
          <h5>Данные об услуге</h5>
          <h6 style={{ textDecoration: "underline" }}>Наименование услуги :</h6>
          <p>{serviceTitle.title}</p>
          <h6 style={{ textDecoration: "underline" }}>Тип услуги:</h6>
          <p>
            {" "}
            {serviceType === "consultation"
              ? "Консультация"
              : "Подача документов"}
          </p>

          <h5>Дата и время записи</h5>
          <div>
            <p>Дата: {new Date(date).toLocaleDateString()}</p>
            <p>Время: {new Date(date).toLocaleTimeString().slice(0, 5)}</p>
          </div>
          <h5> Данные о сотруднике</h5>

          <p>{user.name}</p>
          <p>кабинет № {user.cabinet}</p>
          <h5>Примечания:</h5>
          <small>в поле ниже оставьте свои замечания к данной заявке</small>
          <div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="note"
                  className="materialize-textarea"
                  data-length="120"
                  name="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
                <label htmlFor="Поле для примечаний"></label>
              </div>
            </div>
          </div>
          <FormFooter props={{ onClose, onWrite }} />
        </div>
      </div>
    </div>
  );
};
