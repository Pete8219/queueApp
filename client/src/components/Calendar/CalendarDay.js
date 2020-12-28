import React, { useState, useEffect } from "react"
import { TicketBalance } from "../Tickets/TicketBalance"
import { useHttp } from "../../hooks/http.hook"
import { useHistory } from 'react-router-dom'


export const CalendarDay = ({ day, service }) => {
   

  const TicketDate = new Date(day)
  TicketDate.setHours(0, 0, 0, 0)

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
  }, [request, id])

  const clickHandler = (date, id) => {
      history.push(`/calendar/${id}/${date.toLocaleDateString()}`)
      
      console.log(date.toLocaleDateString(), id)
      
  }



  return (
    <div className="row">
        <a style={{color:"#fff"}} key={TicketDate.toISOString()}  value={TicketDate.toISOString()} onClick={()=>clickHandler(TicketDate, id)}>
            <div className="card blue darken-1">
                
                <p>{TicketDate.toLocaleDateString()}</p>
                {/* <span>{dayOfWeek}</span> */}

                {!loading  && <TicketBalance balance={balance} countAllTicket={countAllTicket} />}
                
            </div>
      </a>
    </div>
  )
}
