import React from "react";
import styles from "./Input.module.css";

export const Input = (props) => {
  return <input className={styles.MyInput} {...props} />;
};
