/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMessage } from "../../hooks/message.hook";
import M from "materialize-css";
import { Employees } from "./Employees";
import { SelectedEmployees } from "./SelectedEmployees";
import { ButtonSave } from "../../UI/Buttons/ButtonSave";
import { ButtonCancel } from "../../UI/Buttons/ButtonCancel";

export const EditService = () => {
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
  });
  const message = useMessage();
  const history = useHistory();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { message: status, service } = useSelector((state) => state.services);
  const { _id, title: t, time, user } = service[0];

  const managers = users.filter((item) => item.userType === "manager");
  const selected = users.filter((elem) => user.includes(elem._id));

  const [title, setTitle] = useState(t || "");
  const [employees, setEmployees] = useState(managers || []);
  const [selectedEmp, setSelectedEmp] = useState(selected || []);

  const addToSelectedEmp = (id) => {
    const selectedItem = employees.filter((emp) => emp._id === id);
    const remaining = employees.filter((emp) => emp._id !== id);
    setSelectedEmp([...selectedEmp, ...selectedItem]);
    setEmployees(remaining);
  };

  const removeFromSelectedEmp = (id) => {
    const unRemovable = selectedEmp.filter((emp) => emp._id !== id);
    const added = selectedEmp.filter((emp) => emp._id === id);
    setSelectedEmp(unRemovable);
    setEmployees([...employees, ...added]);
  };

  const saveHandler = () => {
    console.log(title);
  };
  // Обработчик кнопки отмена
  const cancelHandler = () => {
    history.push("/allservices");
  };

  return (
    <div className="row">
      <div className="col s12 m10 offset-m1 l10 offset-l1 xl10 offset-xl1">
        <div className="row">
          <div className="col s12 m12 l12 xl12">
            <h4>Редактирование услуги</h4>
          </div>
        </div>
        <div className="row">
          <div className="row col s12 m12 l12 xl12">
            <div className="input-field col s12 m12 l12 xl12">
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                className="materialize-textarea"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="title">Название</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m12 l12 xl5">
              <Employees props={{ employees, addToSelectedEmp }} />
            </div>
            <div className="col s12 m12 l12  xl5 right">
              <SelectedEmployees
                props={{ removeFromSelectedEmp, selectedEmp }}
              />
            </div>
          </div>

          <div className="row right">
            <div className="col s6 m6 l6 xl6">
              <ButtonSave action={saveHandler} />
            </div>
            <div className="col s6 m6 l6 xl6">
              <ButtonCancel action={cancelHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
