import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createNewType,
  removeType,
} from "../../../../store/actions/serviceTypes";

export const Types = () => {
  const { types } = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const [newType, setNewType] = useState({ title: "", duration: "" });

  const addType = () => {
    dispatch(createNewType(newType));
  };
  return (
    <div className="row">
      <h5>Типы услуг</h5>
      <div className="row">
        <div className="input-field col s2">
          <input
            type="text"
            id="type"
            name="type"
            value={newType.title}
            onChange={(e) => setNewType({ ...newType, title: e.target.value })}
          />
          <label htmlFor="type">Тип услуги</label>
        </div>
        <div className="input-field col s2">
          <input
            type="text"
            id="duration"
            name="duration"
            value={newType.duration}
            onChange={(e) =>
              setNewType({ ...newType, duration: e.target.value })
            }
          />
          <label htmlFor="duration">Продолжительность, мин</label>
        </div>
        <div
          className="input-field col s2"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            className="btn btn-small waves-effect blue darken-2"
            style={{ marginTop: "0.9em" }}
            onClick={addType}
          >
            Добавить
          </button>
        </div>
      </div>
      <div className="row">
        <table className="col s6">
          <thead>
            <tr>
              <th>Тип</th>
              <th>Продолжительность, мин</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {types.map((type) => {
              return (
                <tr key={type._id}>
                  <td>{type.title}</td>
                  <td>{type.duration}</td>

                  <td>
                    <button
                      className="btn blue lighten-1 right"
                      onClick={() => dispatch(removeType(type._id))}
                    >
                      <i className="material-icons small">delete_forever</i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
