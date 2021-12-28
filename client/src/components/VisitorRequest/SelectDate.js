import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

export const SelectDate = () => {
  setDefaultLocale("ru");

  const { settings } = useSelector((state) => state.settings);
  const { receptionDays } = settings[0];
  const [startDate, setStartDate] = useState(null);

  const nonReceptionDays = (date) => {
    const days = receptionDays.map((item) => Number(item));
    const day = date.getDay(date);
    return days.includes(day);
  };

  return (
    <div className="row col s12 m12 l12 xl12">
      <div className="row">
        <div className="col s12 m3 l1 xl1">Выберите дату:</div>
      </div>
      <div className="row">
        <div className="col s12 m6  l4  xl4 ">
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            filterDate={nonReceptionDays}
            dateFormat="P"
          />
        </div>
      </div>
    </div>
  );
};
