import React from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "../../UI/accountIcon/Icon";
import styles from "./account.module.css";

export const UserAccount = ({ isOpen, isClose }) => {
  const { userId, isAuthenticated, name } = useSelector(
    (state) => state.userRole
  );

  const { users } = useSelector((state) => state.users);
  if (!isOpen) return null;

  const currentUser = users.filter((user) => user._id === userId);

  document.addEventListener("keydown", function (event) {
    if (event.code === "Escape") {
      isClose();
    }
  });

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Icon iconSize={"large"} />
        </div>
        <div className={styles.userInfo}>
          <p>{currentUser.length ? currentUser[0].name : null}</p>
          <p>{currentUser.length ? currentUser[0].login : null}</p>
        </div>
        <div></div>
      </div>
      <div className={styles.footer}>
        <button className="btn-large blue lighten-1">Выйти</button>
      </div>
    </div>,
    document.body
  );
};
