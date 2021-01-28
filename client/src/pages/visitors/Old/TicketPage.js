import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { TicketCheck } from "../../../components/Calendar/TicketCheck"

export const TicketPage = () => {
  const data = JSON.parse(localStorage.getItem("Ticket"))

  const history = useHistory()

  useEffect(() => {
    return () => {
      if (history.action === "POP") {
        history.push("/")
      }
    }
  })

  const printHandler = (event) => {
    if (event) {
      const ticketContent = document.querySelector(".ticketCheck").innerHTML
      const originalContent = document.body.innerHTML

      document.body.innerHTML = ticketContent

      window.print()

      document.body.innerHTML = originalContent
    }
  }

  return (
    <>
      <TicketCheck data={data} printHandler={printHandler} />
    </>
  )
}
