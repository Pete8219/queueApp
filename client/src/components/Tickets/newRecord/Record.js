import React, { useState, useEffect } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RecordForm } from "./RecordForm";
import { CircleLoader } from "../../../components/CircleLoader";
import styles from "./record.module.css";

export const Record = () => {
  const { loading, request } = useHttp();
  const history = useHistory();
  const { services } = useSelector((state) => state.services);

  const [serviceList, setServiceList] = useState(services);
  const [serviceId, setServiceId] = useState(null);
  const [ticketsList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [userId, setUserId] = useState(null);
  const [serviceTitle, setServiceTitle] = useState("Выберите услугу");

  const changeService = (e) => {
    setServiceTitle(e.target.innerText);
    setDate(new Date());
    setUserId(e.target.dataset.employee);
    setServiceId(e.target.dataset.serviceId);
  };

  const updateDate = (d) => {
    setDate(d);
  };

  const onClose = () => {
    history.push("/");
  };

  if (loading) {
    <CircleLoader />;
  }

  return (
    <div className={styles.MainContainer}>
      <div className={styles.recordContent}>
        {!loading && serviceList && (
          <RecordForm
            props={{
              serviceList,
              serviceTitle,
              serviceId,
              userId,
              ticketsList,
              changeService,
              date,
              updateDate,
              onClose,
            }}
          />
        )}
      </div>
    </div>
  );
};
