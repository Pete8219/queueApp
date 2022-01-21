import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editService } from "../../store/actions/services";

import M from "materialize-css";
import { addServiceToRequest } from "../../store/actions/request";

export const SelectService = () => {
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
  });
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);
  const { service } = useSelector((state) => state.request);
  const [selectedService, setSelectedService] = useState("Выберите услугу");

  document.addEventListener("DOMContentLoaded", () => {
    let elems = document.querySelectorAll("select");
    let instance = M.FormSelect(elems);
  });

  const serviceHandler = (e) => {
    const id = e.target.options[e.target.selectedIndex].dataset.id;
    setSelectedService(e.target.value);
    dispatch(editService(id));
    dispatch(addServiceToRequest(id));
  };

  return (
    <div className="row">
      <div className="col s12 m12 l12 xl12">
        <div className="input-field col s12 m12 l12 xl12">
          <select
            className="icons"
            defaultValue={selectedService}
            onChange={serviceHandler}
          >
            <option key="1111" value="Выберите услугу" disabled>
              Выберите услугу
            </option>
            {services.map((service) => {
              return (
                <option key={service._id} data-id={service._id}>
                  {service.title}
                </option>
              );
            })}
          </select>
          <label>Выберите интересующую вас услугу</label>
        </div>
      </div>
    </div>
  );
};
