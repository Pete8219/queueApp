import React, { useState, useEffect, useContext } from "react"
import { useHttp } from "../../hooks/http.hook"
import { useHistory } from 'react-router-dom'
import { useMessage } from "../../hooks/message.hook"
import { AuthContext } from "../../context/AuthContext"
import { Loader } from '../Loader'
import { UserName } from "./UserName"
import { UserTickets } from "./UserTickets.js"
import { ShowModal } from "./ShowModal"


export const TicketList = () => {
  localStorage.removeItem('TicketData')
  const { userId, userType} = useContext(AuthContext)
  const history = useHistory()

  const [userName, setUserName] = useState("")
  const [tickets, setTickets] = useState([])
  const [status, setStatus] = useState("В работе")
  const [date, setDate] = useState(new Date().toISOString().slice(0,10).split('.').reverse().join('-'))
  const [visitor, setVisitor] = useState('')
  const [ticketData, setTicketData] = useState('')
  const [showModal, setShowModal] = useState(false)

  const { loading, request } = useHttp()

  const message = useMessage()

 

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
    if(!date) {
      return
    }
    const fetchTickets = async () => {
      
      try {
        const data = await request(`/tickets/ticketlist/${userId}/${date}`, "GET", null, {})
        
        setTickets(data)
      } catch (e) {}
    }
    fetchTickets()
  }, [request, userId, date, status])



  const handleChange = async (event) => {
    const ticketId = event.target.dataset.ticketId
    const newStatus = event.target.value
    const body = {
      status: newStatus
    }
    
    
     try {
      const data =  await request(`/tickets/${ticketId}`, 'PATCH', body , {})
      message(data.message)
      setStatus(event.target.value)
    } catch(e) {} 

    

  }

  const dateHandler = (event) => {
    setDate(event.target.value)
  }

  const findHandler = (data) => {
    
      setVisitor(data.toUpperCase())
  }

  const pressHandler = async(event) => {
    if(event.key === 'Enter') {
      setDate('')


      try {
        const data =  await request(`/tickets/find/${visitor}`, 'GET', null , {})
        setTickets(data)

      } catch(e) {}
    }
  }

  const changeRecord =  (id) => {
    
    
      const ticketData = tickets.find(item => item._id === id)
      setTicketData(ticketData)
      localStorage.setItem('TicketData', JSON.stringify(ticketData))
      
      setShowModal(prev => !prev)

    //history.push('/ticket/edit')

    
  }

  const closeModal = () => {
    setShowModal(prev => !prev)
  }

   if(loading) {
    return <Loader />
  }  

  return (
    <>
  


      {!loading && userName  && <UserName name={userName} />}
      {!loading && tickets && userType === "user" && <UserTickets  tickets={tickets} status={status} date={date} visitor={visitor} handleChange={handleChange} findHandler={findHandler} dateHandler={dateHandler} pressHandler={pressHandler} changeRecord={changeRecord}/>}
      {ticketData && <ShowModal ticketData={ticketData} showModal={showModal} closeModal={closeModal}/>}
    </>
  )
}
