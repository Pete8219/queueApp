import React, { useState, useEffect, useContext } from "react";
/* import { useHttp } from "../../hooks/http.hook"
import { AuthContext } from "../../context/AuthContext"
import styles from "./editForm.module.css"
import { useMessage } from "../../hooks/message.hook"
import M from "materialize-css" */

/* export const EditForm = ({ props }) => {
  const { closeForm, editTicketList } = props;

  useEffect(() => {
    M.AutoInit();
  }, []);

  const ticket = JSON.parse(localStorage.getItem("ticketId"));

  const {
    date: ticketDate,
    note: ticketNote,
    _id,
    firstname,
    surname,
    lastname,
    email,
    phone,
    service,
    user,
    serviceType,
  } = ticket[0];

  const { token } = useContext(AuthContext);
  const message = useMessage();

  const { request } = useHttp();
  const [services, setServices] = useState([]);
  const [note, setNote] = useState(ticketNote);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await request("/services/", "GET", null, {});
        setServices(data);
      } catch (error) {}
    };

    fetchServices();
  }, [request]);

  const fullname = `${firstname}  ${lastname} ${surname}`;
  const day = new Date(ticketDate).toLocaleDateString();
  const time = new Date(ticketDate).toLocaleTimeString().slice(0, -3);

  let nameOfService = "";

  if (services.length) {
    const data = services.filter((item) => item._id === service);
    nameOfService = data[0].title;
  }

  const saveButton = async () => {
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

    closeForm();
  };

  return (
    <div className={styles.popup}>
      <div className={styles.PopupModal}>
        <div className={styles.PopupContent}>
          <h4>Редактирование записи</h4>
          <div className={styles.content}>
            <h6>Заявитель:</h6>
            <p>{fullname}</p>
          </div>
          <div className={styles.content}>
            <h6>Дата записи:</h6>
            <p>
              {day}. Время: {time}{" "}
            </p>
          </div>
          <div className={styles.content}>
            <h6>На какую услугу записан:</h6>
            <p>{nameOfService}</p>
          </div>
          <div className={styles.content}>
            <h6>Консультация или подача документов:</h6>
            <p>
              {serviceType === "consultation"
                ? "Консультация"
                : "Подача документов"}
            </p>
          </div>

          <div className={styles.content}>
            <h6>Контактный телефон:</h6>
            <p>{phone}</p>
          </div>
          <div className={styles.content}>
            <h6>Адрес электронной почты:</h6>
            <p>{email}</p>
          </div>
          <div className={styles.content}>
            <h6>Сотрудник оказывающий услугу:</h6>
            <p>{user.name}</p>
          </div>
          <div className={styles.content}>
            <h6>Номер кабинета:</h6>
            <p>{user.cabinet}</p>
          </div>
          <div className={styles.content}>
            <h6>Примечание:</h6>
            <p>
              <i className="material-icons prefix">mode_edit</i>

              <textarea
                id="textarea1"
                value={note}
                className="materialize-textarea"
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </p>
          </div>

          <div className="modal-footer">
            <button
              className={[
                "modal-close  btn-flat btn blue",
                styles.rewriteBtn,
              ].join(" ")}
              onClick={saveButton}
            >
              Сохранить
            </button>
            <button
              className={[
                "modal-close  btn-flat btn green",
                styles.Button,
              ].join(" ")}
              onClick={closeForm}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 */
