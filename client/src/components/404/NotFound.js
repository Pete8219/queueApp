import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.MainContainer}>
      <h1 className={styles.status}>404</h1>
      <p>Страница которую вы запрашиваете не существует</p>
      <button className={styles.MyButton} onClick={(e) => navigate("/")}>
        На главную
      </button>
    </div>
  );
};
