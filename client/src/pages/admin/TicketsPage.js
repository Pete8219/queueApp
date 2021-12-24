import React from "react";
import { useLocation } from "react-router";
import styles from "./pages.module.css";

export const TicketsPage = () => {
  localStorage.setItem("link", JSON.stringify(useLocation()));
  return (
    <div className="row">
      <div className="row ">
        <div className="col s12 m12 l10 offset-l1 xl10 offset-xl1">
          <h4>Записи</h4>
        </div>
      </div>
    </div>
  );
};
