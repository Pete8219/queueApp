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
  const [visitor, setVisitor] = useState('')

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


  useEffect(() => {
    if(!visitor) {
      return
    }
    const fetchTickets = async() => {
      try {
        const fetched = await request(`/tickets/find/:${visitor}`, 'GET', null, {})
        console.log(fetched)

      } catch(e) {}
    }
    fetchTickets()
  }, [request, visitor])

  const handleChange = (event) => {
    setStatus(event.target.value)
  }

  const dateHandler = (event) => {
    setDate(event.target.value)
  }

  const findHandler = (event) => {
    event.preventDefault()
      setVisitor((event.target.value).toUpperCase())


  }

   if(loading) {
    return <Loader />
  }  

  return (
    <>
      {!loading && userName  && <UserName name={userName} />}
      {!loading && tickets && userType === "user" && <UserTickets  tickets={tickets} status={status} date={date} visitor={visitor} handleChange={handleChange} findHandler={findHandler} dateHandler={dateHandler} />}
    </>
  )
}
