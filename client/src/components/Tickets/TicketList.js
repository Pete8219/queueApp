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
  
  const [date, setDate] = useState(new Date().toISOString().slice(0,10).split('.').reverse().join('-'))
  const [visitor, setVisitor] = useState('')
  const [ticketData, setTicketData] = useState('')
  const [serviceData, setServiceData] = useState('')
  const [userData, setUserData] = useState('')
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
  }, [request, userId, date])

// На основе данных из талона делаем запрос к базе, чтобы получить информацию об услуге и о сотруднике, оказывающем услугу
  useEffect(() => {

    if(!ticketData) {
      return
    }

    const {service, user} = ticketData

    const fetchServiceData = async () => {
      try {
        const data = await request(`/services/${service}`, 'GET', null, {})
        const userData = await request(`/users/welcome/${user}`, 'GET', null, {})
        setServiceData(data)
        setUserData(userData)

      } catch(e) {}
    }
    fetchServiceData()


  },[request, ticketData])




  const handleChange =  async (event) => {
    
    const ticketId = event.target.dataset.ticketId
    const newStatus = event.target.value

    const ticketsArray = tickets
    
    ticketsArray.forEach(ticket => {
      if(ticket._id === ticketId) {
        ticket.status = newStatus
      }
    })

    setTickets(ticketsArray)
  
    const body = {
      status: newStatus
    }
    try {
      const data =  await request(`/tickets/${ticketId}`, 'PATCH', body , {})
      message(data.message)
    } catch(e) {}

  }

  const dateHandler = (event) => {
    setDate(event.target.value)
  }

  const findHandler = async (data) => {
    let text = ''
    if(text.length < 1) {
      text = data
    } else {
      text += data
    }
     
    setVisitor(text.toUpperCase())


 

  }

  const pressHandler = async(event) => {
    if(event.key === 'Enter') {
      setDate('')


      try {
        const data =  await request(`/tickets/find/${visitor}`, 'GET', null , {})
        setTickets(data)
        setVisitor('')

      } catch(e) {}
    }
  }

  const changeRecord =  (id) => {
    
      const ticketData = tickets.find(item => item._id === id)
      setTicketData(ticketData)
      openModal() 

 }

  const openModal = () => {
    setShowModal(prev => !prev)
  }

  const rewriteRecord = () => {
    const dataForRewrite = Object.assign(ticketData, serviceData)
    localStorage.setItem("TicketData", JSON.stringify(dataForRewrite))
    
    closeModal()
    history.push('/category')
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
      {!loading && tickets  && userType === "user" && <UserTickets  tickets={tickets} date={date} visitor={visitor} handleChange={handleChange} findHandler={findHandler} dateHandler={dateHandler} pressHandler={pressHandler} changeRecord={changeRecord}/>}
      {ticketData && serviceData &&userData && <ShowModal ticketData={ticketData} serviceData={serviceData} userData={userData} showModal={showModal} closeModal={closeModal} rewriteRecord={rewriteRecord}/>}
    </>
  )
}
