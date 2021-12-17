import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styles from "./visitor.module.css";
import M from "materialize-css";
import { DateCalendar } from "./DateCalendar";
import { Calendar } from "../../UI/Calendar/Calendar";
import { TimeTable } from "../TimeTable/TimeTable";

export const NewRequest = () => {
  const location = useLocation();
  localStorage.setItem("url", JSON.stringify(location));

  const { user } = useSelector((state) => state.userRole);
  const { services } = useSelector((state) => state.services);
  const [selectedOption, setSelectedOption] = useState("Выберите услугу");
  const [selectedService, setSelectedService] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showType, setShowType] = useState(false);
  const [serviceType, setServiceType] = useState(null);
  const [showTime, setShowTime] = useState(false);
  const [managers, setManagers] = useState([]);
  const [managerId, setManagerId] = useState(null);
  const [serviceId, setServiceId] = useState(null);

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
  });
  document.addEventListener("DOMContentLoaded", () => {
    let elems = document.querySelectorAll("select");
    let instance = M.FormSelect(elems);
  });

  const handleChange = (e) => {
    setSelectedOption(e.target.value);

    const getService = services.filter(
      (service) => service.title === e.target.value
    );

    const { user, _id } = getService[0];
    setSelectedService(getService);
    setManagers(getService[0].user);
    setServiceId(getService[0]._id);

    setShowType(true);
  };

  const updateDate = (d) => {
    setDate(d);
    setShowTime(true);
  };

  const handleTypes = (e) => {
    console.log(e.target.dataset.type);

    setServiceType(e.target.dataset.type);
    setShowCalendar(true);
  };

  //устанавливаем параметры для Календаря
  const filterDay = true;
  const minDate = true;

  return (
    <div className={styles.MainContainer}>
      <h4>Новая запись</h4>
      <div className={styles.content}>
        <div className="input-field col s12">
          <select
            className="icons"
            defaultValue={selectedOption}
            onChange={handleChange}
          >
            <option key="1111" value="Выберите услугу" disabled>
              Выберите услугу
            </option>
            {services.map((service) => {
              return (
                <option key={service._id} data-id={service._id}>
                  {service.title}
                </option>
              );
            })}
          </select>
          <label style={{ marginLeft: "-1em" }}>
            Выберите интересующую вас услугу
          </label>
        </div>

        {showType ? (
          <form action="#">
            <p>
              <label>
                <input
                  name="types"
                  data-type="consultation"
                  type="radio"
                  value="Консультация (длительность приема 15 минут)"
                  onClick={handleTypes}
                />
                <span>Консультация</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  name="types"
                  data-type="submission"
                  type="radio"
                  value="Подача документов (длительность приема 1 час)"
                  onClick={handleTypes}
                />
                <span>Подача документов</span>
              </label>
            </p>
          </form>
        ) : null}
        {showCalendar ? (
          <Calendar props={{ date, updateDate, filterDay, minDate }} />
        ) : null}
        {showTime && selectedService ? (
          <TimeTable props={{ date, selectedService }} />
        ) : null}
      </div>
    </div>
  );
};
