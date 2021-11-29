/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import styles from "./users.module.css";

export const Create = ({
  formData,
  createHandler,
  changeHandler,
  cancelHandler,
  onlineToggle,
}) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className={styles.MainContainer}>
      <div className="row">
        <h4>Создание нового пользователя</h4>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                placeholder="ФИО сотрудника"
                name="name"
                id="name"
                type="text"
                onChange={changeHandler}
                value={formData.name}
              />
              <label htmlFor="name">Сотрудник</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s4">
              <input
                placeholder="Кабинет"
                name="cabinet"
                id="cabinet"
                type="text"
                onChange={changeHandler}
                value={formData.cabinet}
              />
              <label htmlFor="cabinet">Кабинет</label>
            </div>
            <div className="input-field col s4">
              <input
                placeholder="Начало приема, ч"
                name="start"
                id="start"
                type="text"
                onChange={changeHandler}
                value={formData.start}
              />
              <label htmlFor="start">Начало приема</label>
            </div>
            <div className="input-field col s4">
              <input
                placeholder="Конец приема, ч"
                name="end"
                id="end"
                type="text"
                onChange={changeHandler}
                value={formData.end}
              />
              <label htmlFor="end">Конец приема</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s4">
              <input
                placeholder="Логин пользователя"
                name="login"
                id="login"
                type="text"
                value={formData.login}
                onChange={changeHandler}
              />
              <label htmlFor="login">Логин</label>
            </div>
            <div className="input-field col s4">
              <input
                placeholder="Пароль пользователя"
                name="password"
                id="password"
                type="password"
                onChange={changeHandler}
                value={formData.password}
              />
              <label htmlFor="name">Пароль</label>
            </div>

            <div className="input-field col s4">
              <select
                value={formData.userType}
                name="userType"
                onChange={changeHandler}
              >
                <option selected value="user">
                  user
                </option>
                <option value="admin">admin</option>
                <option value="superAdmin">superAdmin</option>
              </select>
              <label>Права сотрудника</label>
            </div>
          </div>
          <div className="row">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="browser-default"
                  name="online"
                  checked={formData.online}
                  onChange={onlineToggle}
                />
                <span>Доступен для записи онлайн</span>
              </label>
            </p>
          </div>

          <div className="row" style={{ float: "right" }}>
            <a
              className="waves-effect waves-light btn"
              style={{ margin: "2rem" }}
              onClick={createHandler}
            >
              Сохранить
            </a>
            <a className="waves-effect waves-light btn" onClick={cancelHandler}>
              Отмена
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
