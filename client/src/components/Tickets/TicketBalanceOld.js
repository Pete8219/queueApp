import React from "react"

export const TicketBalance = ({ balance, countAllTicket }) => {

 
  const count = countAllTicket - balance

  return (
    <div>
      <p>Осталось талонов: {count}</p>
    </div>
  )
}
