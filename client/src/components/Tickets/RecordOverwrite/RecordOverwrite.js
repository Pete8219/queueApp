import React, { useState, useEffect } from "react";
import { RecordForm } from "../../../pages/admin/newRecord/RecordForm";
import { Loader } from "../../Loader";
import { useHttp } from "../../../hooks/http.hook";
import { useSelector } from "react-redux";
import { ClientForm } from "../../ClientForm/ClientForm";
import { DropDown } from "../../../UI/DropDown/DropDown";
import { RadioSelect } from "../../../UI/RadioSelect/RadioSelect";
import { Calendar } from "../../../UI/Calendar/Calendar";
import { Employee } from "../../Employee/Employee";
import { TimeTable } from "../../TimeTable/TimeTable";
import { FormFooter } from "../../FormFooter/FormFooter";

import { formatDate } from "../../../utils/formatDate";
import api from "../../../http";

import styles from "./RecordOverwrite.module.css";

export const RecordOverwrite = ({ props }) => {
  const { services } = useSelector((state) => state.services);
  const { onClose } = props;
  const clientData = JSON.parse(localStorage.getItem("clientData"));

  const [serviceId, setServiceId] = useState(null);
  const [ticketsList] = useState([]);
  const [date, setDate] = useState(new Date());
  const [userId, setUserId] = useState(null);
  const [serviceTitle, setServiceTitle] = useState("Выберите услугу");
  const [employee, setEmployee] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [serviceType, setServiceType] = useState(null);

  const filterDay = true;
  const minDate = true;

  const {
    firstname,
    lastname,
    surname,
    email,
    phone,
    note: ticketNote,
    _id,
    user,
    service,
    status,
  } = clientData[0];

  const [form] = useState({
    firstname,
    lastname,
    surname,
    email,
    phone,
  });

  const disabled = true;

  useEffect(() => {
    if (!userId) {
      return;
    }
    const getEmployee = async () => {
      try {
        const response = await api("/client/users/", {
          params: { userId, date: formatDate(date) },
        });
        setEmployee(response.data);
        setEmployeeId(response.data._id);
      } catch (error) {}
    };
    getEmployee();
  }, [date, userId]);

  const changeService = (e) => {
    setServiceTitle(e.target.innerText);
    setDate(new Date());
    setUserId(e.target.dataset.employee);
    setServiceId(e.target.dataset.serviceId);
  };

  const updateDate = (d) => {
    setDate(d);
  };

  const onSelect = (e) => {
    if (e) {
      setServiceType(e.target.dataset.stype);
    }
  };

  const onWrite = () => {};

  document.addEventListener("keydown", function (event) {
    if (event.code === "Escape") {
      onClose();
    }
  });

  return (
    <div>
      <div className={styles.popup}>
        <div className={styles.MainContainer}>
          <div className={styles.recordContent}>
            <h4 className={styles.recordHeader}>Создаем запись</h4>

            <ClientForm props={{ form, disabled }} />
            <h5>Данные об услуге</h5>
            <div className={styles.content}>
              <h6>Выберите услугу</h6>
              <DropDown props={{ services, serviceTitle, changeService }} />
            </div>
            <div className={styles.content}>
              <h6>Тип услуги:</h6>
              <div>
                <RadioSelect
                  type="radio"
                  group="group"
                  data="consultation"
                  value="Консультация (длительность приема 15 минут)"
                  onChange={onSelect}
                />
                <RadioSelect
                  type="radio"
                  group="group"
                  data="submission"
                  value="Подача документов (длительность приема 1 час)"
                  onChange={onSelect}
                />
              </div>
            </div>
            {employee && <Employee props={{ employee }} />}
            <h5>Дата и время приема</h5>
            <div className={styles.content}>
              <h6 style={{ paddingTop: "30px" }}>Выберите дату:</h6>
              <Calendar props={{ updateDate, date, filterDay, minDate }} />
            </div>

            <div className={styles.content}>
              <h6>Доступное время для записи</h6>
              <div className={styles.TimeBoxContainer}>
                {employeeId !== null && (
                  <TimeTable props={{ date, employeeId, serviceType }} />
                )}
              </div>
            </div>
            <FormFooter props={{ onClose, onWrite }} />
          </div>
        </div>
      </div>
    </div>
  );
};
