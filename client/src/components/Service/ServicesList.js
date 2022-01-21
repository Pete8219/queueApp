/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMessage } from "../../hooks/message.hook";
import { useSelector, useDispatch } from "react-redux";
import { ButtonCreate } from "../../UI/Buttons/ButtonCreate";
import { deleteService, editService } from "../../store/actions/services";

export const ServicesList = () => {
  const { services, isFetching } = useSelector((state) => state.services);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function sortServiceByFieldTitle(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }

  services.sort(sortServiceByFieldTitle("title"));

  const message = useMessage();

  const editHandler = (id) => {
    dispatch(editService(id));
    setTimeout(() => {
      navigate("/service/edit");
    }, 600);
  };

  const deleteHandler = async (id) => {
    dispatch(deleteService(id));
    if (!isFetching) {
      message("Услуга удалена");
    }
  };

  return (
    <div className="row">
      <div className="col s12 m12 l10 offset-l1 xl10 offset-xl1">
        <div className="row">
          <div className="col s12 m12 l12  xl12">
            <h4>Услуги</h4>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m12 l12 xl12">
            <Link to="/services/create">
              <ButtonCreate />
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col s12 m12 l12  xl12">
            <table className="highlight">
              <thead>
                <tr>
                  <th>Наименование услуги</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {services.map((item, i = 0) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>
                        <button
                          className="btn blue lighten-1 right"
                          title="Изменить"
                          target="_blank"
                          onClick={() => editHandler(item._id)}
                        >
                          <i className="material-icons">edit</i>
                        </button>
                      </td>
                      <td>
                        {" "}
                        <button
                          className="btn blue lighten-1 right"
                          title="Удалить"
                          target="_blank"
                          onClick={() => deleteHandler(item._id)}
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
