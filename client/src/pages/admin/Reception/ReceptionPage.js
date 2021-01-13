import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { useHttp } from ".././../../hooks/http.hook"
import { ReceptionDate } from "../../../components/Reception/ReceptionDate"
import { ReceptionTime } from "../../../components/Reception/ReceptionTime"
import { ReceptionService } from "../../../components/Reception/ReceptionService"
import { ReceptionForm } from "../../../components/Reception/ReceptionForm"

export const ReceptionPage = () => {
  const history = useHistory()  
  const { loading, request } = useHttp()
  const [service, setService] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [userData, setUserData] = useState("")
  const [date, setDate] = useState("")
  const [shortDay, setShortDay] = useState(false)
  const [countTickets, setCountTickets] = useState(null)
  const [tickets, setTickets] = useState("")
  const [formReady, setFormReady] = useState(false)
  const [clicked, setClicked] = useState(false)

  const createDateHandler = (event) => {
    setDate(event.target.value)
    const short = event.target.options[event.target.selectedIndex].dataset.short
    setShortDay(short)
    setFormReady(false)
  }

  const changeService = (event) => {
    const id = event.target.options[event.target.selectedIndex].dataset.id
    const value = event.target.value
    if (id === undefined) {
        setFormReady(false)
        history.go('0')

    }
    setSelectedService({ value, id })
    setFormReady(false)
  }

  const clickHandler = (event) => {
        console.log(event.target)
        setFormReady(true)
        setClicked(true)

    
  }

  useEffect(() => {
    const fetchService = async () => {
      try {
        const fetched = await request("/services", "GET", null, {})
        setService(fetched)
      } catch (e) {}
    }
    fetchService()
  }, [request])

  useEffect(() => {
    const serviceId = selectedService.id
    const selectedDate = date.split(".").reverse().join("-")
    if(serviceId === undefined) {
        return
    }
    const fetchTickets = async () => {
      try {
        const tickets = await request(`/tickets/${serviceId}/${selectedDate}`, "GET", null, {})
        setCountTickets(tickets.length || "0")
        setTickets(tickets)
      } catch (e) {}
    }
    fetchTickets()
  }, [date, request, selectedService.id])

  useEffect(() => {
    const serviceId = selectedService.id
    if(serviceId === undefined) {
        return
    }

    const fetchUserInfo = async () => {
      
      try {
        const userInfo = await request(`/services/info/${serviceId}`, "GET", null, {})
        setUserData(userInfo)
      } catch (e) {}
    }
    fetchUserInfo()
  }, [request, selectedService.id])

  return (
    <>
      <h4>Создание новой записи на прием</h4>
      {!loading && service  && <ReceptionService service={service} selectedService={selectedService} changeService={changeService} />}
      {!loading && selectedService  && <ReceptionDate date={date} shortDay={shortDay} createDateHandler={createDateHandler} />}
      {!loading && date && tickets && countTickets && userData  && <ReceptionTime date={date} shortDay={shortDay} tickets={tickets} countTickets={countTickets} userData={userData} clicked={clicked} clickHandler={clickHandler} />}
      {!loading && formReady === true && <ReceptionForm />}
    </>
  )
}
