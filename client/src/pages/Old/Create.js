/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMessage } from "../../hooks/message.hook";
import M from "materialize-css/dist/js/materialize.min.js";
import { CategoryDropdown } from "../Category/CategoryDropdown";
import { UsersDropdown } from "../Users/UsersDropdown";
import { useSelector, useDispatch } from "react-redux";
import styles from "./service.module.css";
import { createService } from "../../store/actions/services";

export const Create = () => {
  const { users } = useSelector((state) => state.users);
  const { categories } = useSelector((state) => state.categories);
  const { errors } = useSelector((state) => state.services);
  const dispatch = useDispatch();

  const managers = users.filter((item) => item.userType !== "user");

  const [form, setForm] = useState({
    title: "",
    time: "",
    user: [],
    category: [],
  });

  const [unSelectedCategories, setUnSelectedCategories] = useState(categories);
  const [unSelectedUsers, setUnSelectedUsers] = useState(managers);

  const history = useHistory();

  const message = useMessage();

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  useEffect(() => {
    if (!errors) {
      return;
    }
    console.log(errors);
    errors.map((error) => message(error.msg));
  }, [errors, message]);

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

  const cancelHandler = () => {
    history.push("/allservices");
  };

  const createHandler = async () => {
    dispatch(createService(form));
  };

  return (
    <div className={styles.MainContainer}>
      <div className="row">
        <h4>Новая услуга</h4>
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
