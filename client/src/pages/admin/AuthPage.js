import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/asyncActions";

import styles from "./pages.module.css";
import { readyToLogin, roleReducer } from "../../store/roleReducer";

export const AuthPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  const message = useMessage();
  const { loading, request, clearError } = useHttp();

  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  useEffect(() => {
    message(error);

    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = () => {
    dispatch(fetchUser(form));
  };

  const pressHandler = (event) => {
    if (event.key === "Enter") {
      loginHandler();
    }
  };

  return (
    <div className={styles.MainContainer}>
      <div className="row valign-wrapper">
        <div className="col s6 offset-s3">
          <h1 className="center-align">Электронная очередь</h1>
          <div className={["card blue-grey", styles.Card].join(" ")}>
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
                    <span style={{ color: "#0bd9a1e" }}>Зарегистрируйтесь</span>
                  </a>
                </p>
              </div>
            </div>
            <div
              className={["card-action center-align", styles.CardAction].join(
                " "
              )}
            >
              <button
                className="btn-large  blue lighten-1 login"
                style={{ borderRadius: "10px" }}
                onClick={loginHandler}
                disabled={loading}
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
