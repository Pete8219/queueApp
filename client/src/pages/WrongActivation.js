import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export const WrongActivation = () => {
  const navigate = useNavigate();
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    countDown === 0
      ? navigate("/login")
      : setTimeout(() => setCountDown(countDown - 1), 1000);
  }, [countDown, navigate]);

  return (
    <div className={styles.MainContainer}>
      <div className="row">
        <div className="col s12 m12 l12 xl12">
          <span style={{ color: "red" }}>
            <i className="large material-icons">cancel</i>
          </span>
        </div>
        <div className="col s12 m12 l12 xl 12">
          <h3>Ошибка активации аккаунта</h3>
          <p style={{ fontStyle: "italic" }}>
            Вы будете перенаправлены на страницу авторизации через {countDown}
          </p>
        </div>
      </div>
    </div>
  );
};
