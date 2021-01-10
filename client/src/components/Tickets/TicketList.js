import React, { useState, useEffect, useContext } from "react"
import { useHttp } from "../../hooks/http.hook"
import { AuthContext } from "../../context/AuthContext"

import { UserName } from "./UserName"
import { UserTickets } from "./UserTickets.js"

export const TicketList = () => {
  const { userId, userType } = useContext(AuthContext)

  const [userName, setUserName] = useState("")
  const [tickets, setTickets] = useState("")
  const [status, setStatus] = useState("В работе")

  const { loading, request } = useHttp()

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const data = await request(`/users/welcome/${userId}`, "GET", null, {})
        setUserName(data)
      } catch (e) {}
    }
    fetchUserName()
  }, [request, userId])

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await request(`/tickets/lists/${userId}`, "GET", null, {})
        setTickets(tickets)
      } catch (e) {}
    }
    fetchTickets()
  }, [request, userId])

  const handleChange = (event) => {
    setStatus(event.target.value)
  }

  return (
    <>
      {!loading && userName && <UserName name={userName} />}
      {!loading && tickets && userType === "user" && <UserTickets tickets={tickets} status={status} handleChange={handleChange} />}
    </>
  )
}
