/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import api from "../../http";
import { useHistory } from "react-router-dom";
import { useMessage } from "../../hooks/message.hook";
import styles from "./users.module.css";

import { Loader } from "../Loader";

export const UsersList = ({ onDelete, onEdit, onCreate }) => {
  const history = useHistory();
  const message = useMessage();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/users");
        console.log(response.data);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const editHandler = (id) => {
    history.push(`/users/detail/${id}`);
  };

  const createHandler = () => {
    history.push("/users/create");
  };

  const deleteHandler = async (id) => {
    setLoading(true);
    try {
      const response = await api.delete(`/users/${id}`);
      message(response.data.message);
      setUsers(users.filter(({ _id }) => id !== _id));
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.MainContainer}>
      <div className="row col-s12">
        <h4> Список сотрудников</h4>
        <a
          className="btn-floating btn-large waves-effect waves-light red"
          title="Добавить"
          style={{ float: "right" }}
          onClick={createHandler}
        >
          <i className="material-icons">add</i>
        </a>

        {users.length > 0 ? (
          <div
            className="card table-service padding-10"
            style={{ padding: "20px" }}
          >
            <table className="striped">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Логин</th>
                  <th>Сотрудник</th>

                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {users.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.login}</td>
                      <td>{item.name}</td>

                      <td>
                        {" "}
                        <a
                          className="btn-floating btn-small waves-effect blue darken-2"
                          title="Редактировать"
                          target="_blank"
                          style={{ float: "right" }}
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
                          style={{ float: "right" }}
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
        ) : (
          <div>
            <h1>Пользователей не найдено</h1>
          </div>
        )}
      </div>
    </div>
  );
};
