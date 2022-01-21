import React, { useEffect, useState } from "react";
import { ButtonSave } from "../../UI/Buttons/ButtonSave";
import { ButtonCancel } from "../../UI/Buttons/ButtonCancel";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMessage } from "../../hooks/message.hook";
import styles from "./category.module.css";
import { updateCategory } from "../../store/actions/categories";

export const EditCategory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();
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
        navigate("/categories");
      }, 1500);
    }
  };

  const cancelHandler = () => {
    navigate("/categories");
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
        <div className="row right col s12 m12 l12 xl12">
          <div className="col s6 m6 l6 xl6">
            <ButtonSave action={saveHandler} />
          </div>
          <div className="col s6 m6 l6 xl6">
            <ButtonCancel action={cancelHandler} />
          </div>
        </div>
      </form>
    </div>
  );
};
