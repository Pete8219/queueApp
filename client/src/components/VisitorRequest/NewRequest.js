import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styles from "./visitor.module.css";

export const NewRequest = () => {
  const location = useLocation();
  localStorage.setItem("url", JSON.stringify(location));

  const { user } = useSelector((state) => state.userRole);
  console.log(user);

  return (
    <div className={styles.MainContainer}>
      <h4>Новая запись</h4>
    </div>
  );
};
