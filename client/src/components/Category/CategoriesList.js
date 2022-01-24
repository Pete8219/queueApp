import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ButtonCreate } from "../../UI/Buttons/ButtonCreate";
import { useSelector, useDispatch } from "react-redux";
import { useMessage } from "../../hooks/message.hook";

import {
  deleteCategory,
  getCategoriesFromApi,
} from "../../store/actions/categories";
import { Loader } from "../Loader";

export const CategoriesList = () => {
  const dispatch = useDispatch();
  const message = useMessage();

  const { isLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategoriesFromApi());
  }, []);

  const { categories } = useSelector((state) => state.categories);

  const onDelete = (id) => {
    try {
      dispatch(deleteCategory(id));
      message("Запись удалена");
    } catch (error) {}
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="row">
      <div className="col s12 m12 l10 offset-l1 xl10 offset-xl1">
        <div className="row">
          <div className="col s12 m12 l12  xl12">
            <h4>Категории услуг</h4>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m12 l12  xl12 ">
            <Link to="/categories/create">
              <ButtonCreate />
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m12 l12  xl12">
            <table className="highlight">
              <thead>
                <tr>
                  <th>Наименование</th>

                  <th></th>
                </tr>
              </thead>

              <tbody>
                {categories.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>
                        <Link to={`/categories/edit/${item._id}`}>
                          <button
                            className="btn blue lighten-1 right"
                            title="Изменить"
                          >
                            <i className="material-icons">edit</i>
                          </button>
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
    </div>
  );
};
