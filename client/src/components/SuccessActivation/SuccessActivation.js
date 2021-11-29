import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styles from "./styles.module.css";

export const SuccessActivation = () => {
  const history = useHistory();
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    countDown === 0
      ? history.push("/login")
      : setTimeout(() => setCountDown(countDown - 1), 1000);
  }, [countDown, history]);

  return (
    <div className={styles.MainContainer}>
      <div>
        <span style={{ color: "green" }}>
          <i class="large material-icons">check_circle</i>
        </span>
      </div>
      <h3>Ваш аккаун успешно активирован</h3>
      <p style={{ fontStyle: "italic" }}>
        Вы будете перенеправлены на станицу авторизации через {countDown}
      </p>
    </div>
  );
};
