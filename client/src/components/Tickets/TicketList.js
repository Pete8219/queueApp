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
  const { userId, userType, token } = useContext(AuthContext)
  const history = useHistory()

  const [userName, setUserName] = useState("")
  const [tickets, setTickets] = useState([])
  
  const [date, setDate] = useState(new Date().toISOString().slice(0,10).split('.').reverse().join('-'))
  const [visitor, setVisitor] = useState('')
  const [ticketData, setTicketData] = useState('')
  const [serviceData, setServiceData] = useState('')
  const [userData, setUserData] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [notes, setNotes] = useState('')

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
        const data = await request(`/tickets/ticketlist/${userId}/${date}`, "GET", null, {
          Authorization: `Bearer ${token}`
        })
        
        setTickets(data)
        
        
      } catch (e) {}
    }
    fetchTickets()
  }, [request, userId, date, token])

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



// Обработчик изменения статуса заявления
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
      const data =  await request(`/tickets/${ticketId}`, 'PATCH', body , {
        Authorization: `Bearer ${token}`
      })
      message(data.message)
    } catch(e) {}

  }

//Обработчик изменения даты в окне выбора даты приема  
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

//Обработчик нажатия кнопки Enter в  поле поиска зявителя
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

// Изменение и/или просмотр записи о заявке посетителя

  const changeRecord =  (id) => {
    
      const ticketData = tickets.find(item => item._id === id)
      //Возможно нужно сделать запрос к базе и вытащить то заявление которое нужно, иначе в поле Примечание будут старые данные
      setTicketData(ticketData)
      setNotes(ticketData.note)
      console.log(notes)
      openModal() 

 }


// Реакция на нажатие кнопки "Перезаписать на другую дату"
  const rewriteRecord = () => {
    const dataForRewrite = Object.assign(ticketData, serviceData)
    localStorage.setItem("TicketData", JSON.stringify(dataForRewrite))
    
    closeModal()
    history.push('/category')
  }

// Реакция на нажатие кнопки "Сохранить изменения"

  const saveRecord = async () => {
    const id = ticketData._id
    const note = document.getElementById('note')
    

    const body = {
      note:note.value
    }

    
    try {
      const data =  await request(`/tickets/notes/${id}`, 'PATCH', body , {
        Authorization: `Bearer ${token}`
      })
      setNotes(note.value)
      console.log(notes)
      message(data.message)
    } catch(e) {}
    

    closeModal()
  }

  const cancelHandler = () => {
    const isCancel = window.confirm ('Вы уверены, что хотите закрыть форму?')
    if(!isCancel) {
      setShowModal(true)
    } else {
      closeModal()
    }
      
  }

// Управление видимостью модального окна
  const openModal = () => {
    setShowModal(prev => !prev)
  }

  const closeModal = () => {

    setShowModal(prev => !prev)
  }


//Лоадер 
   if(loading) {
    return <Loader />
  }  

  return (
    <>
  


      {!loading && userName  && <UserName name={userName} />}
      {!loading && tickets  && userType === "user" && <UserTickets  tickets={tickets} date={date} visitor={visitor} handleChange={handleChange} findHandler={findHandler} dateHandler={dateHandler} pressHandler={pressHandler} changeRecord={changeRecord}/>}
      {ticketData && serviceData &&userData && <ShowModal ticketData={ticketData} note={notes} serviceData={serviceData} userData={userData} showModal={showModal}  rewriteRecord={rewriteRecord} save={saveRecord} cancel = {cancelHandler}/>}
    </>
  )
}
