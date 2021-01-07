import React, { useState, useEffect, useCallback, useMemo } from "react"
import { TicketBalance } from "../Tickets/TicketBalance"
import { useHttp } from "../../hooks/http.hook"
import { useHistory } from "react-router-dom"

export const CalendarDay = ({ day, service }) => {
  const TicketDate = useMemo(() => {
    //обернули ве в хук UseMemo и добавили в список зависимостей параметр day
    const ticketDate = new Date(day)
    ticketDate.setHours(0, 0, 0, 0)
    return ticketDate
  }, [day])

  const id = service._id
  const user = service.user
  const countAllTicket = Math.floor(((user.end - user.start) * 60) / service.time)

  const { loading, request } = useHttp()
  const [balance, setBalance] = useState("")
  const history = useHistory()

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetched = await request(`/tickets/${id}/${TicketDate.toISOString()}`, "GET", null, {})
        setBalance(fetched.length)
      } catch (e) {}
    }

    fetchTickets()
  }, [request, id, TicketDate]) //добавили зависимость TicketDate. Посмотрим как будет себя вести

  const clickHandler = useCallback((date, id) => {
    history.push(`/calendar/${id}/${date.toLocaleDateString()}`)
  }, [])

  return (
    <div className="row">
      <a style={{ color: "#fff" }} key={TicketDate.toISOString()} value={TicketDate.toISOString()} onClick={() => clickHandler(TicketDate, id)}>
        <div className="card blue darken-1">
          <p>{TicketDate.toLocaleDateString()}</p>
          {!loading && <TicketBalance balance={balance} countAllTicket={countAllTicket} />}
        </div>
      </a>
    </div>
  )
}
