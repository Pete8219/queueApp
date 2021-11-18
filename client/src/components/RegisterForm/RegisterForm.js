import React, { useState, useEffect } from "react";
import M from "materialize-css";
import styles from "./register.module.css";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";

export const RegisterForm = () => {
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
  }, []);

  const { loading, request } = useHttp();

  const message = useMessage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pressHandler = (e) => {
    if (e.code === "Enter") {
      registerHandler();
    }
  };

  const registerHandler = async () => {
    try {
      const register = await request(`/auth/register`, "POST", {
        email,
        password,
      });
      console.log(register);
      message(register.message);
    } catch (error) {}
  };

  return (
    <div>
      <div className={styles.MainContainer}>
        <div className="row valign-wrapper">
          <div className="col s6 offset-s3">
            <h1 className="center-align">Электронная очередь</h1>
            <div
              className="card blue-grey darken-4"
              style={{ width: "60%", margin: "0 auto" }}
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
                          Пароль должен быть не менее 8 символов, содержать хотя
                          бы одну цифру и заглавную букву.
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

              <div className="card-action center-align">
                <button
                  className="btn-large  waves-light blue lighten-1 login"
                  onClick={registerHandler}
                  disabled={loading}
                >
                  Зарегистрироваться
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
