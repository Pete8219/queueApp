import React, { useContext, useState, useEffect } from "react";
import styles from "./profile.module.css";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { useSelector } from "react-redux";

export const StaffProfile = () => {
  const { userId } = useSelector((state) => state);

  const [userName, setUserName] = useState("");
  const { loading, request } = useHttp();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const data = await request(`users/welcome/${userId}`, "GET", null, {});
        setUserName(data);
      } catch (e) {}
    };
    fetchUserName();
  }, [request, userId]);

  if (!loading && userName) {
    return (
      <div className={styles.profile}>
        <span className={styles.staffIcon}>
          <i className="material-icons prefix">account_circle</i>
        </span>
        <span className={styles.staffName}>{userName.name} </span>
      </div>
    );
  }

  return null;
};
