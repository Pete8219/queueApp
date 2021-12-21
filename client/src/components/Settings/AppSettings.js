import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import M from "materialize-css";

export const AppSettings = () => {
  useEffect(() => {
    M.updateTextFields();
    M.AutoInit();
  });

  const [types, setTypes] = useState([
    { _id: "1111", title: "консультация", duration: "15" },
    { _id: "1112", title: "подача документов", duration: "60" },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.MainContainer}>
        <h3>Настройки приложения</h3>
        <div className={styles.content}>
          <div className="row">
            <h5>Настройка времени приема</h5>
            <div className={styles.timeReceipt}>
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s2">
                    <input type="text" id="start" />
                    <label htmlFor="start">Начало приема, ч</label>
                  </div>
                  <div className="input-field col s2">
                    <input type="text" id="end" />
                    <label htmlFor="end">Окончание приема, ч</label>
                  </div>
                </div>
              </form>
            </div>
            {/* Описание настройки тивоп услуг*/}

            <div className="row col s6" style={{ padding: "0" }}>
              <h5>Типы услуг</h5>
              <div className="row">
                <button
                  class="btn-floating btn-large  red darken-1 offset-6 right"
                  onClick={() => setIsOpen(true)}
                >
                  <i class="material-icons">add</i>
                </button>
              </div>
              <div className={styles.timeReceipt}>
                <table className="col s12">
                  <thead>
                    <tr>
                      <th>Тип</th>
                      <th>Продолжительность, мин</th>
                    </tr>
                  </thead>

                  <tbody>
                    {types.map((type) => {
                      return (
                        <tr key={type._id}>
                          <td>{type.title}</td>
                          <td>{type.duration}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen ? (
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
      ) : null}
    </>
  );
};
