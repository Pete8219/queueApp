import React, { useState } from "react";

export const ReceptionDays = ({ props }) => {
  const { days, receptionDays, daysHandler } = props;

  return (
    <div className="row">
      <h5>Дни приема </h5>
      <form action="#" className="col s12 ">
        {days.map((day, index) => {
          return (
            <p key={index} className="col s4 m2 l2 xl1">
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  value={index}
                  checked={
                    receptionDays.includes(index.toString()) ? true : false
                  }
                  onChange={daysHandler}
                />
                <span>{day}</span>
              </label>
            </p>
          );
        })}
      </form>
    </div>
  );
};
