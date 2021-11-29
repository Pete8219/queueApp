import React from "react";
import styles from "./profile.module.css";
import { useSelector } from "react-redux";

export const StaffProfile = () => {
  const { userId } = useSelector((state) => state.userRole);
  const { users } = useSelector((state) => state.users);

  let currentUser = [];

  if (users.length > 0) {
    currentUser = users.filter((user) => user._id === userId);
  }

  return (
    <div>
      {currentUser.length > 0 ? (
        <div className={styles.profile}>
          <span className={styles.staffIcon}>
            <i className="material-icons prefix">account_circle</i>
          </span>
          <span className={styles.staffName}>{currentUser[0].name}</span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
