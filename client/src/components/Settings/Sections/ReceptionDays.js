import React, { useState } from "react";

export const ReceptionDays = ({ props }) => {
  const { days, receptionDays, daysHandler } = props;

  return (
    <div className="row">
      <h5>Дни приема </h5>
      <form
        action="#"
        className="col s12"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {days.map((day, index) => {
          return (
            <p key={index} style={{ marginRight: "2em" }}>
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
