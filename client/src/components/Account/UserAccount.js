import React from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/roleReducer";
import { Icon } from "../../UI/accountIcon/Icon";
import styles from "./account.module.css";

export const UserAccount = ({ isOpen, isClose }) => {
  const { userId } = useSelector((state) => state.userRole);

  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);
  if (!isOpen) return null;

  const currentUser = users.filter((user) => user._id === userId);

  document.addEventListener("keydown", function (event) {
    if (event.code === "Escape") {
      isClose();
    }
  });
  const onLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(logout());
  };

  return ReactDOM.createPortal(
    <div className={styles.modal} data-toggle="modal">
      <div className={styles.content}>
        <div className={styles.header}>
          <Icon iconSize={"large"} />
          <i className={["material-icons", styles.iconPhoto].join(" ")}>
            add_a_photo
          </i>
        </div>
        <div className={styles.userInfo}>
          <p>{currentUser.length ? currentUser[0].name : null}</p>
          <p>{currentUser.length ? currentUser[0].login : null}</p>
          <Link to="/profile">
            <button
              className={styles.editProfileButton}
              onClick={() => isClose()}
            >
              Редактировать профиль
            </button>
          </Link>
        </div>
      </div>
      <div
        style={{ width: "100%", height: "1px", backgroundColor: "#c2c2c2" }}
      ></div>

      <div className={styles.footer}>
        <button className="btn-small blue lighten-1" onClick={onLogout}>
          Выйти
        </button>
      </div>
    </div>,
    document.body
  );
};
