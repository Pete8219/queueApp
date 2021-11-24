import React, { useEffect, useState, useContext } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { Calendar } from "../../../UI/Calendar/Calendar";
import { DropDown } from "../../../UI/DropDown/DropDown";
import { RadioSelect } from "../../../UI/RadioSelect/RadioSelect";

import { useMessage } from "../../../hooks/message.hook";
import styles from "./rewrite.module.css";
import { TimeTable } from "../../TimeTable/TimeTable";
import { useSelector } from "react-redux";

export const RewriteForm = ({ close, rewrite, serviceList, reload }) => {
  const ticket = JSON.parse(localStorage.getItem("ticketId"));
  const {
    firstname,
    surname,
    lastname,
    email,
    phone,
    _id: ticketId,
    ...rest
  } = ticket[0];

  const { token } = useSelector((state) => state);
  const message = useMessage();

  const { request } = useHttp();
  const [services, setServices] = useState(serviceList);
  const [date, setDate] = useState(new Date());
  const [serviceType, setServiceType] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [serviceTitle, setServiceTitle] = useState("Выберите услугу");
  const [serviceId, setServiceId] = useState(null);
  const [update, setUpdate] = useState(false);

  const filterDay = true;
  const minDate = true;

  const updateDate = (d) => {
    setDate(d);
  };

  useEffect(() => {
    if (!employeeId || update === false) {
      return;
    }
    const fetchEmployee = async () => {
      try {
        const data = await request(`/client/users/${employeeId}`, "GET", null, {
          Authorization: `Bearer ${token}`,
        });

        setEmployeeData(data);
      } catch (error) {}
    };

    fetchEmployee();
  }, [employeeId, request, update, token]);

  const changeService = (e) => {
    const serviceName = e.target.innerText;
    setEmployeeId(e.target.dataset.employee);
    setUpdate(true);
    setServiceTitle(serviceName);
    setServiceId(e.target.dataset.serviceId);
  };

  const onSelect = (e) => {
    if (e) {
      setServiceType(e.target.dataset.stype);
    }
  };

  const rewriteButton = async () => {
    const time = JSON.parse(localStorage.getItem("time"));
    const rewriteDate = new Date(date);
    rewriteDate.setHours(time.slice(0, 2));
    rewriteDate.setMinutes(time.slice(3, 5));

    const body = {
      service: serviceId,
      date: rewriteDate,
      time,
      firstname,
      lastname,
      surname,
      phone,
      email,
      status: "pending",
      serviceType,
      user: employeeData._id,
      note: rest.note,
    };

    try {
      const data = await request(`/tickets/${ticketId}`, "PATCH", body, {
        Authorization: `Bearer ${token}`,
      });

      message(data.message);
    } catch (error) {}

    close();
    reload();
  };

  return (
    <div className={styles.popup}>
      <div className={styles.PopupModal}>
        <div className={styles.PopupContent}>
          <h4>Создание новой записи</h4>

          <div className={styles.content}>
            <h6>Перезаписать на услугу:</h6>
            <DropDown props={{ services, serviceTitle, changeService }} />
          </div>
          {employeeData ? (
            <>
              <div className={styles.content}>
                <h6>Сотрудник, оказывающий услугу:</h6>
                <p>{employeeData.name}</p>
              </div>
              <div className={styles.content}>
                <h6>Номер кабинета:</h6>
                <p>{employeeData.cabinet}</p>
              </div>
            </>
          ) : null}

          <div className={styles.content}>
            <h6>Тип услуги:</h6>
            <div>
              <RadioSelect
                type="radio"
                group="group"
                data="consultation"
                value="Консультация"
                onChange={onSelect}
              />
              <RadioSelect
                type="radio"
                group="group"
                data="submission"
                value="Подача документов"
                onChange={onSelect}
              />
            </div>
          </div>
          <div className={styles.content} style={{ marginTop: "20px" }}>
            <h6 style={{ paddingTop: "30px" }}>Выбрать новую дату:</h6>
            <Calendar props={{ updateDate, date, filterDay, minDate }} />
          </div>
          <div className={styles.content}>
            <h6>Доступное время для записи:</h6>
            <div className={styles.TimeBoxContainer}>
              {employeeId && (
                <TimeTable props={{ date, employeeId, serviceId }} />
              )}
            </div>
          </div>
          <div className={["modal-footer", styles.PopupFooter].join(" ")}>
            <button
              className={[
                "modal-close  btn-flat btn red",
                styles.rewriteBtn,
              ].join(" ")}
              onClick={rewriteButton}
            >
              Записать
            </button>
            <button
              className={[
                "modal-close  btn-flat btn green",
                styles.Button,
              ].join(" ")}
              onClick={close}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
