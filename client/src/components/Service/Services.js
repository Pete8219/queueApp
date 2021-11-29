/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import styles from "./service.module.css";

export const ServicesList = ({ services, onDelete }) => {
  function sortServiceByFieldTitle(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }

  services.sort(sortServiceByFieldTitle("title"));

  const history = useHistory();
  const message = useMessage();
  const { request, error, clearError } = useHttp();

  const createHandler = () => {
    history.push("/services/create");
  };

  const editHandler = (id) => {
    console.log(id);
    history.push(`/service/detail/${id}`);
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [message, error, clearError, request]);

  return (
    <div className={styles.MainContainer}>
      <div className="row col-s12">
        <h4>Список услуг управления</h4>
        <a
          className="btn-floating btn-large waves-effect waves-light red"
          title="Добавить"
          style={{ float: "right" }}
          onClick={createHandler}
        >
          <i className="material-icons">add</i>
        </a>
        <div className="card table-service padding-10">
          <table className="striped">
            <thead>
              <tr>
                <th>№</th>
                <th>Наименование услуги</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {services.map((item, i = 0) => {
                return (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.title}</td>
                    <td>
                      {" "}
                      <a
                        className="btn-floating btn-small waves-effect blue darken-2"
                        title="Редактировать"
                        target="_blank"
                        onClick={() => editHandler(item._id)}
                      >
                        <i className="material-icons">settings</i>
                      </a>
                    </td>
                    <td>
                      {" "}
                      <a
                        className="btn-floating btn-small waves-effect blue darken-2"
                        title="Удалить"
                        target="_blank"
                        onClick={() => onDelete(item._id)}
                      >
                        <i className="material-icons">delete_forever</i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
