/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useMessage } from "../../hooks/message.hook";
import { useSelector, useDispatch } from "react-redux";
import styles from "./service.module.css";
import { ButtonEdit } from "../../UI/Buttons/ButtonEdit";
import { ButtonCreate } from "../../UI/Buttons/ButtonCreate";
import { deleteService } from "../../store/actions/services";

export const ServicesList = () => {
  const { services, isFetching } = useSelector((state) => state.services);

  const dispatch = useDispatch();
  function sortServiceByFieldTitle(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }

  services.sort(sortServiceByFieldTitle("title"));

  const history = useHistory();
  const message = useMessage();

  const deleteHandler = async (id) => {
    
    dispatch(deleteService(id));
    if(!isFetching) {
      message('Услуга удалена')
    }

  };

  return (
    <div className={styles.MainContainer}>
      <div className="row col-s12">
        <h4>Список услуг управления</h4>
        <Link to="/services/create">
          <ButtonCreate />
        </Link>

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
                      <Link to={`/service/edit/${item._id}`}>
                      <ButtonEdit />
                      </Link>
 
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
