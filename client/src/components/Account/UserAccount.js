import React from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/AuthReducer";
import { Icon } from "../../UI/accountIcon/Icon";
import styles from "./account.module.css";

export const UserAccount = ({ isOpen, isClose }) => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isOpen) return null;

  document.addEventListener("keydown", function (event) {
    if (event.code === "Escape") {
      isClose();
    }
  });
  const onLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("url");
    dispatch(logout());
    navigate("/", { replace: true });
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
          <p>{user?.name ? user.name : null}</p>
          <p>{user?.login ? user.login : null}</p>
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
