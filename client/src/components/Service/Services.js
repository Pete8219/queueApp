/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMessage } from "../../hooks/message.hook";
import api from "../../http";
import { useSelector, useDispatch } from "react-redux";
import styles from "./service.module.css";
import { filterServices, serviceReducer } from "../../store/serviceReducer";
import { getAllServices } from "../../store/asyncActions";

export const ServicesList = () => {
  useEffect(() => {
    dispatch(getAllServices());
  }, []);

  const { services } = useSelector((state) => state.services);

  const dispatch = useDispatch(serviceReducer);
  function sortServiceByFieldTitle(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }

  services.sort(sortServiceByFieldTitle("title"));

  const history = useHistory();
  const message = useMessage();

  const [serviceList, setServiceList] = useState(services);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setServiceList(services);
  }, [services]);

  const createHandler = () => {
    history.push("/services/create");
  };

  const editHandler = (id) => {
    history.push(`/service/detail/${id}`);
  };
  const deleteHandler = async (id) => {
    dispatch(filterServices(id));
    setLoading(true);
    try {
      const response = await api.delete(`/services/${id}`);
      message(response.data.message);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

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
              {serviceList.map((item, i = 0) => {
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
                        onClick={() => deleteHandler(item._id)}
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
