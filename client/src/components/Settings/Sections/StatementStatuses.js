import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewStatus, removeStatus } from "../../../store/actions/statuses";

export const StatementStatuses = () => {
  const { statuses } = useSelector((state) => state.statuses);
  const dispatch = useDispatch();

  const [newStatus, setNewStatus] = useState({ title: "" });

  const addStatus = () => {
    dispatch(addNewStatus(newStatus));
    setNewStatus({ ...newStatus, title: "" });
  };
  return (
    <div className="row">
      <h5>Статусы заявок</h5>
      <div className="row">
        <div className="input-field col s4">
          <input
            type="text"
            id="status"
            name="status"
            value={newStatus.title}
            onChange={(e) =>
              setNewStatus({ ...newStatus, title: e.target.value })
            }
          />
          <label htmlFor="status">Название статуса</label>
        </div>

        <div
          className="input-field col s2"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            className="btn btn-small waves-effect blue darken-2"
            style={{ marginTop: "0.9em" }}
            onClick={addStatus}
          >
            Добавить
          </button>
        </div>
      </div>
      <div className="row">
        <table className="col s6">
          <thead>
            <tr>
              <th>Статусы</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {statuses.length > 0 ? (
              statuses.map((status) => {
                return (
                  <tr key={status._id}>
                    <td>{status.title}</td>
                    <td></td>

                    <td>
                      <button
                        className="btn blue lighten-1 right"
                        onClick={() => dispatch(removeStatus(status._id))}
                      >
                        <i className="material-icons small">delete_forever</i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div>
                <p>Не создано ни одного статуса</p>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
