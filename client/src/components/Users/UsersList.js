/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useState } from "react";
import api from "../../http";
import { useLocation, Link } from "react-router-dom";
import { useMessage } from "../../hooks/message.hook";
import { useSelector, useDispatch } from "react-redux";
import {ButtonCreate} from '../../UI/Buttons/ButtonCreate'
import {ButtonEdit} from '../../UI/Buttons/ButtonEdit'
import styles from "./users.module.css";

import { Loader } from "../Loader";
import { deleteUser } from "../../store/actions/users";

export const UsersList = () => {
  localStorage.setItem("link", JSON.stringify(useLocation()));
  const dispatch = useDispatch()
  const message = useMessage();
  const { users } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);


  const deleteHandler =  (id) => {
    dispatch(deleteUser(id))
/* 
    setLoading(true);
    try {
      const response = await api.delete(`/users/${id}`);
      message(response.data.message);
      users.filter(({ _id }) => id !== _id);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    } */
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.MainContainer}>
      <div className="row col-s12">
        <h4> Список сотрудников</h4>
        <Link to="/users/create">
          <ButtonCreate/>
        </Link>


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
                        <Link to={`/users/detail/${item._id}`}>
                          <ButtonEdit />
                        </Link>
 
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
