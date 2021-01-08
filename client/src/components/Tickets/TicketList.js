import React, { useState, useEffect } from "react"
import { useHttp } from "../../hooks/http.hook"

import { UserName } from "./UserName"
import { UserTickets } from "./UserTickets.js"

export const TicketList = ({ userId }) => {
  console.log(userId)
  const [userName, setUserName] = useState("")
  const [tickets, setTickets] = useState("")

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
        const tickets = await request(`/tickets/lists/${userId}`, "GET", {})
        setTickets(tickets)
      } catch (e) {}
    }
    fetchTickets()
  }, [request, userId])

  return (
    <>
      <UserName name={userName} />
      <UserTickets tickets={tickets} />
    </>
  )
}
