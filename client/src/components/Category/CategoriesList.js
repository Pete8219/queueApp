import React from "react";
import { Link } from "react-router-dom";
import { ButtonCreate } from "../../UI/Buttons/ButtonCreate";
import styles from "./category.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useMessage } from "../../hooks/message.hook";
import { ButtonEdit } from "../../UI/Buttons/ButtonEdit";
import { deleteCategory } from "../../store/actions/categories";
import { Loader } from "../Loader";

export const CategoriesList = () => {
  const dispatch = useDispatch();
  const message = useMessage();

  const { categories, loading } = useSelector((state) => state.categories);

  const onDelete = async (id) => {
    try {
      dispatch(deleteCategory(id));
      message("Запись удалена");
    } catch (error) {}
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.MainContainer}>
      <div className="row col-s12">
        <h4>Категории услуг</h4>
        <Link to="/categories/create">
          <ButtonCreate />
        </Link>

        <div className="row">
          <table className="highlight">
            <thead>
              <tr>
                <th>№</th>
                <th>Наименование</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {categories.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>
                      <Link to={`/categories/edit/${item._id}`}>
                        <ButtonEdit />
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn blue lighten-1 right"
                        title="Удалить"
                        target="_blank"
                        onClick={() => onDelete(item._id)}
                      >
                        <i className="material-icons">delete_forever</i>
                      </button>
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
