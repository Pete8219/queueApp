import React, { useState, useEffect, useContext } from "react";
import { ClientForm } from "../../ClientForm/ClientForm";
import { FormFooter } from "../../FormFooter/FormFooter";
import { DropDown } from "../../../UI/DropDown/DropDown";
import { RadioSelect } from "../../../UI/RadioSelect/RadioSelect";
import { AuthContext } from "../../../context/AuthContext";
import { Calendar } from "../../../UI/Calendar/Calendar";
import { RecordForm } from "../../../pages/admin/newRecord/RecordForm";
import { CircleLoader } from "../../CircleLoader";
import { useHttp } from "../../../hooks/http.hook";
import styles from "./RecordOverwrite.module.css";
import { formatDate } from "../../../utils/formatDate";

export const RecordOverwrite = ({ props }) => {
  const { onClose } = props;

  const { loading, request } = useHttp();

  const [serviceList, setServiceList] = useState([]);
  const [serviceId, setServiceId] = useState(null);
  const [ticketsList, setTicketsList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [userId, setUserId] = useState(null);
  const [serviceTitle, setServiceTitle] = useState("Выберите услугу");

  useEffect(() => {
    const getServiceList = async () => {
      try {
        const data = await request("/services", "GET", null, {});
        setServiceList(data);
      } catch (error) {}
    };
    getServiceList();
  }, []);

  const changeService = (e) => {
    setServiceTitle(e.target.innerText);
    setDate(new Date());
    setUserId(e.target.dataset.employee);
    setServiceId(e.target.dataset.serviceId);
  };

  const updateDate = (d) => {
    setDate(d);
  };

  document.addEventListener("keydown", function (event) {
    if (event.code === "Escape") {
      onClose();
    }
  });

  if (loading) {
    <CircleLoader />;
  }

  return (
    <div>
      <div className={styles.popup}>
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
      </div>
    </div>
  );
};
