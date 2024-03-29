import React, { useEffect, useState } from "react";
import { DropDown } from "../../../UI/DropDown/DropDown";
import { Calendar } from "../../../UI/Calendar/Calendar";
import { Employee } from "../../../components/Employee/Employee";
import M from "materialize-css";
import styles from "./record.module.css";
import { ClientForm } from "../../../components/ClientForm/ClientForm";
import { FormFooter } from "../../../components/FormFooter/FormFooter";
import { formatDate } from "../../../utils/formatDate";

import { TimeTable } from "../../../components/TimeTable/TimeTable";
import { RadioSelect } from "../../../UI/RadioSelect/RadioSelect";

import { useMessage } from "../../../hooks/message.hook";
import { useSelector } from "react-redux";
import api from "../../../http";

export const RecordForm = ({ props }) => {
  const clientData = JSON.parse(localStorage.getItem("clientData"));

  const { services } = useSelector((state) => state.services);

  let clientInfo = {
    firstname: "",
    lastname: "",
    surname: "",
    email: "",
    phone: "",
  };

  if (clientData) {
    clientInfo = {
      firstname: clientData[0].firstname,
      lastname: clientData[0].lastname,
      surname: clientData[0].surname,
      email: clientData[0].email,
      phone: clientData[0].phone,
    };
  }

  //const { token } = useSelector((state) => state.userRole);
  const message = useMessage();

  const {
    //serviceList: services,
    serviceTitle,
    serviceId,
    date,
    updateDate,
    changeService,
    userId,
    onClose,
  } = props;

  const [employee, setEmployee] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(date);

  const [form, setForm] = useState({ ...clientInfo });

  useEffect(() => {
    M.updateTextFields();
  }, []);

  const filterDay = true;
  const minDate = true;

  useEffect(() => {
    if (!userId) {
      return;
    }
    const getEmployee = async () => {
      try {
        const response = await api.get("/client/users/", {
          params: { userId, date: formatDate(date) },
        });

        setEmployee(response.data);
        setEmployeeId(response.data._id);
      } catch (error) {}
    };
    getEmployee();
  }, [date, userId]);

  const onSelect = (e) => {
    if (e) {
      setServiceType(e.target.dataset.stype);
    }
  };

  const changeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onWrite = async () => {
    const date = JSON.parse(localStorage.getItem("date"));

    const { firstname, surname, lastname, email, phone } = form;
    const body = {
      firstname,
      lastname,
      surname,
      phone,
      email,
      user: employeeId,
      serviceType,
      service: serviceId,
      date,
    };

    try {
      const response = await api.post("/tickets/create", { ...body });
      message(response.data.message);
      onClose();
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.FormContent}>
        <h4 className={styles.recordHeader}>Создаем запись</h4>

        <ClientForm props={{ form, changeForm }} />
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
      </div>
      <FormFooter props={{ onClose, onWrite }} />
    </>
  );
};
