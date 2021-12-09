import React from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

export const Icon = ({ iconSize }) => {
  const { name } = useSelector((state) => state.userRole);
  const size = iconSize === "large" ? styles.largeCircle : styles.circle;
  return (
    <div className={styles.Container}>
      <div className={size}>{name ? name[0] : `?`}</div>
    </div>
  );
};
