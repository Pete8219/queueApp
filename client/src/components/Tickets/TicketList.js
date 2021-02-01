import React, { useState, useEffect, useContext } from "react"
import { useHttp } from "../../hooks/http.hook"
import { AuthContext } from "../../context/AuthContext"
import { Loader } from '../Loader'
import { UserName } from "./UserName"
import { UserTickets } from "./UserTickets.js"

export const TicketList = () => {
  const { userId, userType} = useContext(AuthContext)

  const [userName, setUserName] = useState("")
  const [tickets, setTickets] = useState([])
  const [status, setStatus] = useState("В работе")
  const [date, setDate] = useState(new Date().toISOString().slice(0,10).split('.').reverse().join('-'))

  const { loading, request, ready } = useHttp()

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
      console.log(date)
      try {
        const data = await request(`/tickets/${userId}/${date}`, "GET", null, {})
        console.log(data)
        setTickets(data)
      } catch (e) {}
    }
    fetchTickets()
  }, [request, userId, date])

  const handleChange = (event) => {
    setStatus(event.target.value)
  }

  const dateHandler = (event) => {
    setDate(event.target.value)
  }

   if(loading) {
    return <Loader />
  }  

  return (
    <>
      {!loading && userName  && <UserName name={userName} />}
      {!loading && tickets && userType === "user" && <UserTickets  tickets={tickets} status={status} date={date} handleChange={handleChange} dateHandler={dateHandler} />}
    </>
  )
}
