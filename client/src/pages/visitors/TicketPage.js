import React from "react"
import { TicketCheck } from "../../components/Calendar/TicketCheck"

export const TicketPage = () => {
  const data = JSON.parse(localStorage.getItem("Ticket"))

  return (
    <>
      <TicketCheck data={data} />
    </>
  )
}
