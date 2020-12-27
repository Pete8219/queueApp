import React, { useState, useEffect } from "react"
import { TicketBalance } from "../Tickets/TicketBalance"
import { useHttp } from "../../hooks/http.hook"

export const CalendarDay = ({ day, service }) => {
  const TicketDate = new Date(day)
  TicketDate.setHours(0, 0, 0, 0)

  const id = service._id
  const user = service.user
  const countAllTicket = Math.floor(((user.end - user.start) * 60) / service.time)

  const { request } = useHttp()
  const [balance, setBalance] = useState("")

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetched = await request(`/tickets/${id}/${TicketDate.toISOString()}`, "GET", null, {})
        setBalance(fetched.length)
      } catch (e) {}
    }

    fetchTickets()
  }, [request, id])

  return (
    <div className="row">
      <div className="card blue darken-1">
        <p>{TicketDate.toLocaleDateString()}</p>
        {/* <span>{dayOfWeek}</span> */}

        <TicketBalance balance={balance} countAllTicket={countAllTicket} />
      </div>
    </div>
  )
}
