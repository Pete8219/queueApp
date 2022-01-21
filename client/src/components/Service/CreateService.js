import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import M from "materialize-css";
import { Employees } from "./Employees";
import { SelectedEmployees } from "./SelectedEmployees";
import { ButtonSave } from "../../UI/Buttons/ButtonSave";
import { ButtonCancel } from "../../UI/Buttons/ButtonCancel";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../hooks/message.hook";
import { createService } from "../../store/actions/services";

export const CreateService = () => {
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
  });
  const navigate = useNavigate();
  const message = useMessage();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { message: status } = useSelector((state) => state.services);
  const managers = users.filter((user) => user.userType === "manager");

  const [title, setTitle] = useState("");
  const [employees, setEmployees] = useState(managers);
  const [selectedEmp, setSelectedEmp] = useState([]);

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
    const user = selectedEmp.map((emp) => emp._id);
    dispatch(createService({ title, user }));
    message(status);
    navigate("/allservices");
  };

  const cancelHandler = () => {
    navigate("/allservices");
  };

  return (
    <div className="row">
      <div className="row col s12 m10 offset-m1 l10 offset-l1 xl10 offset-xl1">
        <div className="row">
          <h4>Новая услуга</h4>
        </div>
        <div className="row">
          <div className="col s12 m10 l8 xl-8">
            <div className="input-field col s12 m12 l12 xl12">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Введите название услуги"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="title">Название новой услуги</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m12 l12 xl5">
            <Employees props={{ employees, addToSelectedEmp }} />
          </div>

          <div className="col s12 m12 l12  xl5 right">
            <SelectedEmployees props={{ removeFromSelectedEmp, selectedEmp }} />
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
  );
};
