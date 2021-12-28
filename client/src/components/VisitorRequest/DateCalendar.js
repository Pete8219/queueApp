import React, { useEffect, useState } from "react";
import M from "materialize-css";

export const DateCalendar = () => {
  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
  });
  document.addEventListener("DOMContentLoaded", () => {
    let elem = document.querySelector(".datepicker");
    let instance = M.Datepicker.init(elem, { autoClose: true });
  });

  //const [date, setDate] = useState("");

  //const changeDate = (e) => {};
  return (
    <>
      <div className="row">
        <div className="col s12 m6 l4 xl4">
          <label>Выберите дату записи</label>
          <input type="text" className="datepicker" />
        </div>
      </div>
    </>
  );
};
