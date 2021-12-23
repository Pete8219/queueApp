import React, { useEffect } from "react";
import M from "materialize-css";

export const Shedule = ({ props }) => {
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
  });

  const { shedule, timeHandler } = props;

  return (
    <div className="row">
      <h5>Время приема</h5>
      <div className="row">
        <div className="input-field col s12 m6 l6 xl2">
          <input
            type="text"
            id="start"
            name="start"
            value={shedule.start}
            onChange={timeHandler}
          />
          <label htmlFor="start">Начало приема, ч</label>
        </div>
        <div className="input-field col s12 m6 l6 xl2">
          <input
            type="text"
            id="end"
            name="end"
            value={shedule.end}
            onChange={timeHandler}
          />
          <label htmlFor="end">Окончание приема, ч</label>
        </div>
      </div>
    </div>
  );
};
