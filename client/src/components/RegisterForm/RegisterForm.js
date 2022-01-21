import React, { useState, useEffect } from "react";
import M from "materialize-css";
import styles from "./register.module.css";
import { useMessage } from "../../hooks/message.hook";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const RegisterForm = () => {
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
  }, []);

  const message = useMessage();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pressHandler = (e) => {
    if (e.code === "Enter") {
      registerHandler();
    }
  };

  const registerHandler = async () => {
    try {
      const response = await axios.post(`/auth/register`, {
        email,
        password,
      });

      if (response.data.status === "200") {
        message(response.data.message);
        navigate("/success_registration", { replace: true });
        return;
      }

      if (response.data.errors.length) {
        return response.data.errors.map((err) => message(err.msg));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.MainContainer}>
      <div className="row">
        <div className="row">
          <div className="col s12 m12 l12 xl12">
            <h1 className="center-align">Электронная очередь</h1>
            <div className="row">
              <div
                className={[
                  "card blue-grey col s12 m10 offset-m1 l4 xl4 offset-xl4",
                  styles.Card,
                ].join(" ")}
              >
                <div className="card-content">
                  <span className="card-title ">Регистрация</span>
                  <div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">account_circle</i>
                        <input
                          placeholder="Введите свой Email"
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          className={styles.MyInput}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyPress={pressHandler}
                          style={{ color: "#fff !important" }}
                        />
                        <label htmlFor="email"></label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix">https</i>
                        <input
                          placeholder="Введите пароль"
                          id="password"
                          name="password"
                          type="password"
                          value={password}
                          className={styles.MyInput}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyPress={pressHandler}
                          style={{ color: "#fff !important" }}
                        />
                        <p
                          style={{
                            color: "white",
                            margin: "0 auto",
                            textAlign: "center",
                          }}
                        >
                          <small>
                            Пароль должен быть не менее 8 символов, содержать
                            хотя бы одну цифру и заглавную букву.
                          </small>

                          <br />
                          <small>Например: Yhgtnhd1</small>
                        </p>
                        <label htmlFor="email"></label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <p className={styles.description}>
                      После регистрации на ваш адрес поступит письмо с паролем и
                      ссылкой на активацию учетной записи
                    </p>
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
                    Есть логин и пароль?{" "}
                    <a href="/login">
                      <span
                        style={{
                          color: "#ede70d",
                          textDecoration: "underline",
                        }}
                      >
                        Авторизуйтесь
                      </span>
                    </a>
                  </p>
                </div>

                <div
                  className={[
                    "card-action center-align",
                    styles.CardAction,
                  ].join(" ")}
                >
                  <button
                    className="btn-large  waves-light blue lighten-1 login"
                    style={{ borderRadius: "10px" }}
                    onClick={registerHandler}
                    /* disabled={loading} */
                  >
                    Зарегистрироваться
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
