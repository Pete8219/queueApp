import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styles from "./styles.module.css";

export const SuccessRegistration = () => {
  const history = useHistory();
  const [countDown, setCountDown] = useState(15);

  useEffect(() => {
    countDown === 0
      ? history.push("/login")
      : setTimeout(() => setCountDown(countDown - 1), 1000);
  }, [countDown, history]);

  return (
    <div className={styles.MainContainer}>
      <div>
        <span style={{ color: "green" }}>
          <i className="large material-icons">check_circle</i>
        </span>
      </div>
      <h3>Спасибо за регистрацию.</h3>
      <p style={{ fontSize: "1.2em", textAlign: "center" }}>
        {" "}
        На электронную почту, указанную вами при регистрации отправлено
        сообщение с ссылкой на активацию учетной записи. После активации Вы
        сможете зайти со своим логином и паролем в систему "Электронная очередь"
      </p>
      <p style={{ fontStyle: "italic" }}>
        Вы будете перенеправлены на станицу авторизации через {countDown}
      </p>
    </div>
  );
};
