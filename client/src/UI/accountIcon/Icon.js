import React from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

export const Icon = ({ iconSize }) => {
  const { user } = useSelector((state) => state.auth);
  const size = iconSize === "large" ? styles.largeCircle : styles.circle;
  return (
    <div className={styles.Container}>
      <div className={size}>{user?.name ? user.name[0] : `?`}</div>
    </div>
  );
};
