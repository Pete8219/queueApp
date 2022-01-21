import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RecordForm } from "./RecordForm";

import styles from "./record.module.css";

export const Record = () => {
  const navigate = useNavigate();
  const { services } = useSelector((state) => state.services);

  const [serviceList] = useState(services);
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
    navigate("/");
  };

  /*   if (loading) {
    <CircleLoader />;
  } */

  return (
    <div className={styles.MainContainer}>
      <div className={styles.recordContent}>
        {serviceList && (
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
