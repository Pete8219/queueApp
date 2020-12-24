import React from "react"

export const CalendarDay = ({ days }) => {
  console.log(typeof days)

  Object.keys(days).map((itemKey) => {
    return (
      <div>
        <p>{days[itemKey]}</p>
      </div>
    )
  })
}
