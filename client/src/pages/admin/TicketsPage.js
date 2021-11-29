import React from "react";
import { useLocation } from "react-router";
import styles from "./pages.module.css";

export const TicketsPage = () => {
  localStorage.setItem("link", JSON.stringify(useLocation()));
  return (
    <div className={styles.MainContainer}>
      <h1>Список тикетов</h1>
    </div>
  );
};
