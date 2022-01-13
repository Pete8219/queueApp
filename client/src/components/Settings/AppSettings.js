import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./settings.module.css";
import M from "materialize-css";
import { Types } from "./Sections/serviceTypes/Types";
import { Shedule } from "./Sections/Shedule/Shedule";
import { ButtonSave } from "../../UI/Buttons/ButtonSave";
import { ButtonCancel } from "../../UI/Buttons/ButtonCancel";
import { ReceptionDays } from "./Sections/ReceptionDays";
import { saveAllSettings } from "../../store/actions/settings";
import { StatementStatuses } from "./Sections/StatementStatuses";
import { useHistory } from "react-router-dom";

export const AppSettings = () => {
  useEffect(() => {
    M.updateTextFields();
    M.AutoInit();
  });

  const history = useHistory();

  const { types } = useSelector((state) => state.types);
  const { statuses } = useSelector((state) => state.statuses);
  const { settings } = useSelector((state) => state.settings);
  const { shedule: time, receptionDays: recDays } = settings[0];

  const dispatch = useDispatch();
  const serviceTypes = types.map((type) => type._id);
  const statementStatuses = statuses.map((status) => status._id);

  /* const [isOpen, setIsOpen] = useState(false); */

  const [shedule, setShedule] = useState({
    start: time.start || "",
    end: time.end || "",
  });
  const [receptionDays, setReceptionDays] = useState(recDays || []);

  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  const timeHandler = (e) => {
    setShedule({ ...shedule, [e.target.name]: e.target.value });
  };
  const daysHandler = (e) => {
    if (e.target.checked === true) {
      const arrayDays = [...receptionDays];
      arrayDays.push(e.target.value);

      setReceptionDays(arrayDays);
    } else {
      const arrayDays = receptionDays.filter((item) => item !== e.target.value);

      setReceptionDays(arrayDays);
    }
  };

  const saveHandler = () => {
    dispatch(
      saveAllSettings({
        shedule,
        serviceTypes,
        receptionDays,
        statementStatuses,
      })
    );

    setTimeout(() => {
      history.push("/");
    }, 1500);
  };

  const cancelHandler = () => {
    history.push("/");
  };

  return (
    <>
      <div className={styles.MainContainer}>
        <h4>Настройки приложения</h4>
        <div className={styles.content}>
          <Shedule props={{ shedule, timeHandler }} />
          <div className="row">
            <hr className={styles.separator} />
          </div>
          <Types />
          <div className="row">
            <hr className={styles.separator} />
          </div>
          <StatementStatuses />
          <div className="row">
            <hr className={styles.separator} />
          </div>

          <ReceptionDays props={{ days, receptionDays, daysHandler }} />
          <div className="row">
            <hr className={styles.separator} />
          </div>
          <div className="row right col s12">
            <div className="col s6">
              <ButtonSave action={saveHandler} />
            </div>
            <div className="col s6">
              <ButtonCancel action={cancelHandler} />
            </div>
          </div>
        </div>
      </div>

      {/*  {isOpen ? (
        <div className={styles.modal}>
          <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
              <h5>Новый тип услуг</h5>
              <div className="row">
                <form className="col s12">
                  <div className="input-field col s6">
                    <input type="text" id="typeOfService" />
                    <label htmlFor="typeOfService">Введите тип услуги</label>
                  </div>
                  <div className="input-field col s6">
                    <input type="text" id="duration" />
                    <label htmlFor="duration">Продолжительность</label>
                  </div>
                </form>
              </div>
              <div className="row">
                <button className="btn btn-small blue ">Добавить</button>
                <button
                  className="btn btn-small green "
                  onClick={() => setIsOpen(false)}
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null} */}
    </>
  );
};
