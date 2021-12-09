import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./profile.module.css";
import M from "materialize-css";
import { ChangePassword } from "../ChangePassword/ChangePassword";

export const UserProfile = () => {
  useEffect(() => {
    M.AutoInit();
  });

  useEffect(() => {
    M.updateTextFields();
  });

  const { userId, name } = useSelector((state) => state.userRole);

  const person = name.split(" ");

  const [lastname, setLastname] = useState(person[0] || "");
  const [firstname, setFirstname] = useState(person[1] || "");
  const [patronimic, setPatronimic] = useState(person[2] || "");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const passChange = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <div className={styles.MainProfile}>
        <h3 style={{ marginBottom: "1em" }}>Профиль пользователя</h3>

        <div className={styles.profileData}>
          <h5>Основная информация</h5>
          <div className={styles.fullName}>
            <form class="col s12">
              <div class="row">
                <div class="input-field col s4">
                  <input
                    id="lastname"
                    type="text"
                    class="validate"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <label htmlFor="lastname">Фамилия</label>
                </div>
                <div class="input-field col s4">
                  <input
                    id="firstname"
                    type="text"
                    class="validate"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <label htmlFor="firstname">Имя</label>
                </div>
                <div class="input-field col s4">
                  <input
                    id="patronimic"
                    type="text"
                    class="validate"
                    value={patronimic}
                    onChange={(e) => setPatronimic(e.target.value)}
                  />
                  <label htmlFor="patronimic">Отчество</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.profileData}>
          <h5>Контактная информация</h5>
          <div className={styles.fullName}>
            <form class="col s12">
              <div class="row">
                <div class="input-field col s4">
                  <input id="phone" type="text" class="validate" />
                  <label htmlFor="phone">Контактный телефон</label>
                </div>
                <div class="input-field col s4">
                  <input
                    id="email"
                    type="email"
                    class="validate"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.profileData}>
          <h5>Учетные данные</h5>
          <div className={styles.fullName}>
            <form class="col s12">
              <div class="row">
                <div class="input-field col s4">
                  <input id="login" type="text" class="validate" disabled />
                  <label htmlFor="login">Логин</label>
                </div>
                <div class="input-field col s4">
                  <input
                    id="password"
                    type="password"
                    class="validate"
                    disabled
                  />
                  <label htmlFor="password">Пароль</label>
                </div>
                <div class="input-field col s4">
                  <button
                    className="btn-small blue darken-1"
                    style={{ marginTop: "10px" }}
                    onClick={passChange}
                  >
                    Изменить пароль
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <ChangePassword isOpen={open} isClose={() => setOpen(false)} />
      </div>
    </>
  );
};
