import React from "react";
import { useSelector } from "react-redux";
import { Request } from "../../components/VisitorRequest/Request";
import styles from "./styles.module.css";

export const HomePage = () => {
  const { name } = useSelector((state) => state.userRole);

  return (
    <div className={styles.MainContainer}>
      {name === "" ? (
        <div>
          <p className={styles.alertMessage}>
            Вы еще не заполнили свой Профиль. Данная информация пригодится при
            оформлении заявки.
          </p>
          <p>
            Чтобы заполнить информацию о себе нажмите на кружок с вопросительным
            знаком в правом верхнем углу и перейдите в свой Профиль
          </p>
        </div>
      ) : null}
      <Request />
    </div>
  );
};
