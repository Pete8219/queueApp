/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import M from "materialize-css/dist/js/materialize.min.js";
import { CategoryDropdown } from "../Category/CategoryDropdown";
import { UsersDropdown } from "../Users/UsersDropdown";
import { AuthContext } from "../../context/AuthContext";
import styles from "./service.module.css";

export const CreateService = ({ users, categories }) => {
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    time: "",
    user: [],
    category: [],
  });

  const [unSelectedCategories, setUnSelectedCategories] = useState(categories);
  const [unSelectedUsers, setUnSelectedUsers] = useState(users);

  const history = useHistory();
  const { request, error, clearError } = useHttp();
  const message = useMessage();

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  useEffect(() => {
    message(error);
    clearError();
  }, [message, error, clearError]);

  useEffect(() => {
    const filteredCats = form.category.map(JSON.stringify);
    const unselected = categories
      .map(JSON.stringify)
      .filter((e) => !filteredCats.includes(e))
      .map(JSON.parse);

    setUnSelectedCategories(unselected);
  }, [form.category, categories]);

  useEffect(() => {
    const filteredUsers = form.user.map(JSON.stringify);
    const unselected = users
      .map(JSON.stringify)
      .filter((e) => !filteredUsers.includes(e))
      .map(JSON.parse);

    setUnSelectedUsers(unselected);
  }, [form.user, users]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  //Добавление в список Выбранных категорий

  const addHandler = (data) => {
    const result = [...form.category];
    result.push(data);
    setForm({ ...form, category: result });
  };

  //Добавление в список Выбранных сотрудников

  const addUserHandler = (data) => {
    const result = [...form.user];
    result.push(data);
    setForm({ ...form, user: result });
  };

  // Удаление категории из списка выбранных
  const deleteHandler = (data) => {
    const result = form.category.filter((item) => {
      return item._id !== data._id;
    });

    setForm({ ...form, category: result });
  };

  //Удаление сотрудника из списка выбранных

  const deleteUserHandler = (data) => {
    const result = form.user.filter((item) => {
      return item._id !== data._id;
    });

    setForm({ ...form, user: result });
  };

  const cancelHandler = () => {
    history.push("/services");
  };

  const createHandler = async () => {
    try {
      const data = await request(
        "/services",
        "POST",
        { ...form },
        { Authorization: `Bearer ${token}` }
      );
      message(data.message);
      history.push("/services");
    } catch (e) {}
  };

  return (
    <div className={styles.MainContainer}>
      <div className="row">
        <h4>Создаем новую услугу</h4>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="title"
                name="title"
                type="text"
                className="materialize-textarea"
                onChange={changeHandler}
              />
              <label htmlFor="title">Название</label>
            </div>
            <CategoryDropdown
              categories={unSelectedCategories}
              category={form.category}
              handler={addHandler}
              deleteHandler={deleteHandler}
            />
            <div className="input-field col s4">
              <input
                placeholder="Время,мин"
                id="time"
                type="text"
                name="time"
                className="validate"
                onChange={changeHandler}
              />
              <label htmlFor="time">Время оказания</label>
            </div>
            <UsersDropdown
              users={unSelectedUsers}
              user={form.user}
              handler={addUserHandler}
              deleteHandler={deleteUserHandler}
            />
          </div>
          <div className="row" style={{ float: "right" }}>
            <a
              className="waves-effect waves-light btn"
              style={{ margin: "2rem" }}
              onClick={createHandler}
            >
              Сохранить
            </a>
            <a className="waves-effect waves-light btn" onClick={cancelHandler}>
              Отмена
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
