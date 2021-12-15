import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { useMessage } from "../../hooks/message.hook";
import styles from "./change.module.css";
import M from "materialize-css";
import api from "../../http";
import { validatePassword } from "./validatePassword";

export const ChangePassword = ({ isOpen, isClose }) => {
  const { userId } = useSelector((state) => state.userRole);
  const message = useMessage();
  useEffect(() => {
    M.AutoInit();
  });

  useEffect(() => {
    M.updateTextFields();
  });

  const [password, setPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");

  const saveBtn = async (e) => {
    e.preventDefault();

    const errors = validatePassword(password, againPassword);
    if (errors.length) {
      return errors.map((error) => message(error));
    }

    try {
      const response = await api.patch(`/users/${userId}/password/change`, {
        password,
      });
      message(response.data.message);
      setTimeout(() => {
        isClose();
      }, 500);
    } catch {}
  };

  const cancelButton = () => {
    setPassword("");
    setAgainPassword("");
    isClose();
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <button className="btn btn-small red left" onClick={cancelButton}>
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
