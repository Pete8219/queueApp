import React, { useEffect } from "react";
import styles from "./clientForm.module.css";
import { useMessage } from "../../hooks/message.hook";
import M from "materialize-css";

export const ClientForm = ({ props }) => {
  const message = useMessage();
  const { firstname, surname, lastname, email, phone } = props.form;

  useEffect(() => {
    M.updateTextFields();
  }, []);

  const onBlur = (e) => {
    if (e.target.value === "") {
      message(`Вы не заполнили поле ${e.target.dataset.name}`);
    }
  };

  return (
    <div>
      <h5>Данные заявителя</h5>

      <div className={styles.VisitorData}>
        <div className="input-field col s12">
          <input
            placeholder="Введите фамилию"
            id="lastname"
            name="lastname"
            type="text"
            data-name="Фамилия"
            defaultValue={lastname}
            className="validate"
            onChange={props.changeForm}
            onBlur={onBlur}
            disabled={props.disabled}
            required
          />
          <label htmlFor="lastname">Фамилия</label>
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Введите имя"
            id="firstname"
            name="firstname"
            type="text"
            data-name="Имя"
            defaultValue={firstname}
            className="validate"
            onChange={props.changeForm}
            onBlur={onBlur}
            disabled={props.disabled}
            required
          />
          <label htmlFor="firstname">Имя</label>
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Введите отчество"
            id="surname"
            type="text"
            data-name="Отчество"
            name="surname"
            defaultValue={surname}
            className="validate"
            onChange={props.changeForm}
            disabled={props.disabled}
          />
          <label htmlFor="surname">Отчество</label>
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Введите Email"
            id="email"
            name="email"
            type="email"
            data-name="Email"
            defaultValue={email}
            className="validate"
            onChange={props.changeForm}
            disabled={props.disabled}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-field col s12">
          <input
            placeholder="+7(  ) xxx - xx - xx"
            id="phone"
            name="phone"
            type="text"
            data-name="Номер телефона"
            defaultValue={phone}
            className="validate"
            onChange={props.changeForm}
            disabled={props.disabled}
            onBlur={onBlur}
            required
          />
          <label htmlFor="phone">Номер телефона</label>
        </div>
      </div>
    </div>
  );
};
