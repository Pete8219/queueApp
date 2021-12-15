import React, { useEffect, useState } from "react";
import { ButtonSave } from "../../UI/Buttons/ButtonSave";
import { ButtonCancel } from "../../UI/Buttons/ButtonCancel";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMessage } from "../../hooks/message.hook";
import styles from "./category.module.css";
import { updateCategory } from "../../store/actions/categories";

export const EditCategory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const history = useHistory();
  const message = useMessage();

  const { categories, loading } = useSelector((state) => state.categories);

  const [title, setTitle] = useState("");

  useEffect(() => {
    const currentCategory = categories.filter(
      (category) => category._id === id
    );
    setTitle(currentCategory[0].title);
  }, [categories, id]);

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const saveHandler = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ id, title }));
    if (!loading) {
      message("Название категории изменено");
      setTimeout(() => {
        history.push("/categories");
      }, 1500);
    }
  };

  const cancelHandler = () => {
    history.push("/categories");
  };

  return (
    <div className={styles.MainContainer}>
      <h4>Редактирование категории</h4>

      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={changeTitle}
            />
          </div>
        </div>
        <div className="row" style={{ float: "right" }}>
          <ButtonSave action={saveHandler} />
          <ButtonCancel action={cancelHandler} />
        </div>
      </form>
    </div>
  );
};
