import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "materialize-css";
import { authUser } from "./store/actions/auth";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    window.M.updateTextFields();
    window.M.AutoInit();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = () => {
    dispatch(authUser(form));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m12 l12 xl12">
          <div className="row">
            <div
              style={{
                dislay: "flex",
                flexDirection: "row",
                justifyContent: "center",

                alignItems: "center",
              }}
            >
              <div className="row">
                <h3>Авторизация</h3>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="validate login"
                    onChange={changeHandler}
                    style={{ color: "#fff !important" }}
                  />
                  <label htmlFor="username">Имя пользователя</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    name="password"
                    type="text"
                    className="validate password"
                    onChange={changeHandler}
                    style={{ color: "#fff !important" }}
                  />
                  <label htmlFor="password">Пароль</label>
                </div>
              </div>
              <div className="row">
                <button
                  className="btn btn-large blue lighten-1 right"
                  onClick={loginHandler}
                >
                  Войти
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
