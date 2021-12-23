import React, { useState } from "react";
import { ButtonSave } from "../../UI/Buttons/ButtonSave";
import { ButtonCancel } from "../../UI/Buttons/ButtonCancel";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../store/actions/categories";
import { useHistory } from "react-router-dom";
import { useMessage } from "../../hooks/message.hook";
import styles from "./category.module.css";

export const CreateCategory = ({ cancel }) => {
  const message = useMessage();
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const { loading } = useSelector((state) => state.categories);

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const saveCategory = (e) => {
    e.preventDefault();
    dispatch(addCategory(title));
    if (!loading) {
      message("Категория создана");
      setTimeout(() => {
        history.push("/categories");
      }, 1500);
    }
  };

  const onCancel = () => {
    history.push("/categories");
  };

  return (
    <div className={styles.MainContainer}>
      <h4>Новая категория</h4>

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
        <div className="row">
          <ButtonSave action={saveCategory} />
          <ButtonCancel action={onCancel} />
        </div>
      </form>
    </div>
  );
};
