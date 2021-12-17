import React, { useEffect, useState } from "react";
import M from "materialize-css";

export const DateCalendar = () => {
  useEffect(() => {
    M.AutoInit();
  });
  let datePicker = document.querySelector(".datepicker");
  console.log(datePicker);
  const options = {
    autoClose: true,
    format: "dd mmm, yyyy",
  };
  let instanceDate = M.Datepicker.init(datePicker, options);

  console.log(instanceDate);

  const [date, setDate] = useState("");

  const changeDate = (e) => {};
  return (
    <>
      <div className="row col s4">
        <div className="col s4" style={{ padding: "0px" }}>
          <label>Выберите дату записи</label>
          <input type="text" className="datepicker" onChange={changeDate} />
        </div>
      </div>
    </>
  );
};
