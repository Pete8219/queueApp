import React, { useEffect, useState } from "react";

import { useMessage } from "../../hooks/message.hook";

import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../store/actions/authenticate";

import styles from "./pages.module.css";

export const AuthPage = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.userRole);

  const message = useMessage();

  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  useEffect(() => {
    message(error);
  }, [error, message]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = () => {
    dispatch(authUser(form));
  };

  const pressHandler = (event) => {
    if (event.key === "Enter") {
      loginHandler();
    }
  };

  return (
    <div className={styles.MainContainer}>
      <div className="row ">
        <div className="row ">
          <div className="col s12 m12 l12 xl12 ">
            <h1 className="center-align">Электронная очередь</h1>
            <div className="row">
              <div
                className={[
                  "card blue-grey col s12 m10 offset-m1 l4 xl4 offset-xl4",
                  styles.Card,
                ].join(" ")}
              >
                <div className="card-content">
                  <span className="card-title ">Авторизация</span>
                  <div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">account_circle</i>
                        <input
                          placeholder="Введите свой Email"
                          id="login"
                          name="login"
                          type="text"
                          className="validate login"
                          onChange={changeHandler}
                          style={{ color: "#fff !important" }}
                        />
                        <label htmlFor="login">Логин </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">https</i>
                        <input
                          placeholder="Введите пароль"
                          id="password"
                          type="password"
                          name="password"
                          className="validate password"
                          onChange={changeHandler}
                          onKeyPress={pressHandler}
                          style={{ color: "#fff !important" }}
                        />
                        <label htmlFor="password">Пароль</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <p
                      style={{
                        width: "100%",
                        margin: "0 auto",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      Нет логина и пароля?{" "}
                      <a href="/register">
                        <span style={{ color: "#0bd9a1e" }}>
                          Зарегистрируйтесь
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
                <div
                  className={[
                    "card-action center-align",
                    styles.CardAction,
                  ].join(" ")}
                >
                  <button
                    className="btn-large  blue lighten-1 login"
                    style={{ borderRadius: "10px" }}
                    onClick={loginHandler}
                    /* disabled={loading} */
                  >
                    Войти
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
