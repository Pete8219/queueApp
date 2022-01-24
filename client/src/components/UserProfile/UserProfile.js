import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./profile.module.css";
import M from "materialize-css";
import { ChangePassword } from "../ChangePassword/ChangePassword";
import { ButtonSave } from "../../UI/Buttons/ButtonSave";
import { ButtonCancel } from "../../UI/Buttons/ButtonCancel";
import { updateProfile } from "../../store/userReducer";
import { updateUserProfile } from "../../store/actions/users";
import { Loader } from "../Loader";

export const UserProfile = () => {
  const location = useLocation();
  localStorage.setItem("url", JSON.stringify(location));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    M.AutoInit();
  });

  useEffect(() => {
    M.updateTextFields();
  });

  const { user, isLoading } = useSelector((state) => state.auth);

  const person = user.name.split(" ");

  const [lastname, setLastname] = useState(person[0] || "");
  const [firstname, setFirstname] = useState(person[1] || "");
  const [patronimic, setPatronimic] = useState(person[2] || "");
  const [email, setEmail] = useState(user.login);
  const [phone, setPhone] = useState(user.phone || "");
  const [login] = useState(user.login);

  const [open, setOpen] = useState(false);

  const passChange = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  //Обработчик кнопки сохранения профайла пользователя
  const saveProfile = () => {
    const { _id } = user;
    const name = [lastname, firstname, patronimic].join(" ");
    const userData = {
      name,
      email,
      phone,
    };
    dispatch(updateUserProfile({ _id, userData }));
  };

  // Выход из формы редактирования на главную страницу

  const cancelProfile = () => {
    navigate("/");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.MainProfile}>
        <h3 style={{ marginBottom: "1em" }}>Профиль пользователя</h3>
        <div className={styles.profileData}>
          <h5>Основная информация</h5>
          <div className={styles.fullName}>
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12 m12 l4 xl4">
                  <input
                    id="lastname"
                    type="text"
                    className="validate"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <label htmlFor="lastname">Фамилия</label>
                </div>
                <div className="input-field col s12 m12 l4 xl4">
                  <input
                    id="firstname"
                    type="text"
                    className="validate"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <label htmlFor="firstname">Имя</label>
                </div>
                <div className="input-field col s12 m12 l4 xl4">
                  <input
                    id="patronimic"
                    type="text"
                    className="validate"
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
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12 m6 l6 xl6">
                  <input
                    id="phone"
                    type="text"
                    className="validate"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label htmlFor="phone">Контактный телефон</label>
                </div>
                <div className="input-field col s12 m6 l6 xl6">
                  <input
                    id="email"
                    type="email"
                    className="validate"
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
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12 m6 l4 xl2">
                  <input
                    id="login"
                    type="text"
                    className="validate"
                    disabled
                    value={login}
                  />
                  <label htmlFor="login">Логин</label>
                </div>

                <div className="input-field col s6 offset-s3 m4 offset-m1 l4 xl2">
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
        <div className="row right">
          <ButtonSave action={saveProfile} />{" "}
          <ButtonCancel action={cancelProfile} />
        </div>
      </div>
      <div>
        <ChangePassword isOpen={open} isClose={() => setOpen(false)} />
      </div>
    </>
  );
};
