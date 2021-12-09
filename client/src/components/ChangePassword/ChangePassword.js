import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./change.module.css";
import M from "materialize-css";

export const ChangePassword = ({ isOpen, isClose }) => {
  useEffect(() => {
    M.AutoInit();
  });

  useEffect(() => {
    M.updateTextFields();
  });

  const [newPassword, setNewPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");

  const saveBtn = (e) => {
    e.preventDefault();
    if (newPassword !== againPassword) {
      alert("Пароли не совпадают");
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.rootContainer}>
      <div className={styles.changeContainer}>
        <h5>Смена пароля пользователя</h5>
        <div className={styles.passwordFields}>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="password"
                  id="password_new"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor="password_new">введите новый пароль</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="password"
                  id="password_again"
                  value={againPassword}
                  onChange={(e) => setAgainPassword(e.target.value)}
                />
                <label htmlFor="password_again">введите пароль еще раз</label>
              </div>
            </div>
            <div className="row">
              <button
                className="btn btn-small red left"
                onClick={() => isClose()}
              >
                Отмена
              </button>
              <button
                className="btn btn-small blue darken-1 right"
                onClick={saveBtn}
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};
