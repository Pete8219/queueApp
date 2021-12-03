/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import M from "materialize-css/dist/js/materialize.min.js";
import { CategoryDropdown } from "../Category/CategoryDropdown";
import { UsersDropdown } from "../Users/UsersDropdown";
import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import styles from "./service.module.css";
import api from "../../http";

export const Detail = ({ id }) => {
  const { users } = useSelector((state) => state.users);
  const { services } = useSelector((state) => state.services);
  const { categories } = useSelector((state) => state.categories);

  const service = services.filter((item) => item._id === id);

  const { _id, title, time, category, user } = service[0];

  const message = useMessage();
  const history = useHistory();

  const selectedCategory = categories.filter((item) =>
    category.includes(item._id)
  );

  const selectedUsers = users.filter((item) => user.includes(item._id));

  const [form, setForm] = useState({
    title,
    time,
    category: selectedCategory,
    user: selectedUsers,
  });

  console.log("form=>", form);

  const [unSelectedCategories, setUnSelectedCategories] = useState(categories); //state который хранит не выделенные категории услуг
  const [unSelectedUsers, setUnSelectedUsers] = useState(users); // хранит невыбранных пользователей в списке всех сотрудников

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

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const updateHandler = async () => {
    try {
      const response = await api.patch(`/services/${_id}`, { ...form });
      message(response.data.message);
      history.push("/allservices");
    } catch (e) {}
  };

  //Добавление в список Выбранных категорий

  const addHandler = (data) => {
    const selectedCats = categories.filter(
      (categorie) => categorie._id === data
    );

    const result = [...form.category];

    result.push(...selectedCats);

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
    console.log(data);
    const result = form.category.filter((item) => {
      return item._id !== data;
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

  // Обработчик кнопки отмена
  const cancelHandler = () => {
    history.push("/allservices");
  };

  return (
    <div className={styles.MainContainer}>
      <div className="row">
        <h3>Редактирование услуги</h3>

        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
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
            <UsersDropdown
              users={unSelectedUsers}
              user={form.user}
              handler={addUserHandler}
              deleteHandler={deleteUserHandler}
            />
            <div className="input-field col s4">
              <input
                id="time"
                name="time"
                type="text"
                value={form.time}
                style={{ color: "#000" }}
                onChange={changeHandler}
              />
              <label htmlFor="title">Время оказания</label>
            </div>
          </div>
          <div className="row" style={{ float: "right" }}>
            <a
              className="waves-effect waves-light btn"
              style={{ margin: "2rem" }}
              onClick={updateHandler}
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
