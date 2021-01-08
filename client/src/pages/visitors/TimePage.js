import React, { useState, useEffect, useCallback } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"

import { TimeTable } from "../../components/Calendar/TimeTable"
import { ContactForm } from "../../components/Calendar/ContactForm"

const storageName = "TimeData"

export const TimePage = () => {
  const params = useParams()
  const history = useHistory()
  const { loading, request, error, clearError } = useHttp()
  const [service, setService] = useState("")
  const [form, setForm] = useState({
    lastname: "",
    firstname: "",
    surname: "",
    phone: "",
  })

  const message = useMessage()

  const [tickets, setTickets] = useState("")
  const [active, setActive] = useState("TimeTable")

  const id = useParams().id
  const date = params.date.split(".").reverse().join("-")
  const ticketDate = new Date(date).toISOString()

  useEffect(() => {
    const fetchService = async () => {
      try {
        const fetched = await request(`/services/${id}`, "GET", null, {})
        setService(fetched)
      } catch (e) {}
    }

    fetchService()
  }, [request, id])

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetched = await request(`/tickets/${id}/${ticketDate}`, "GET", null, {})
        setTickets(fetched)
      } catch (e) {}
    }
    fetchTickets()
  }, [request, id, ticketDate])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data) {
      setActive("ContactForm")
    }
  }, [])

  useEffect(() => {
    return () => {
      if (history.action === "POP") {
        history.push(`/calendar/${id}/${params.date}`)
      }
    }
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [message, error, clearError])

  const changeComponentHandler = useCallback((data) => {
    localStorage.setItem(
      storageName,
      JSON.stringify({
        TicketTime: data.item,
      })
    )

    setActive("ContactForm")
  }, [])

  const changeTimeTableHandler = useCallback((data) => {
    localStorage.removeItem(storageName)

    setActive("TimeTable")
  }, [])

  const backToCalendar = () => {
    history.push(`/calendar/${id}`)
  }

  const changeFormHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const submitFormHandler = async () => {
    const Time = JSON.parse(localStorage.getItem("TimeData"))
    const hours = Time.TicketTime.slice(0, 2)
    const minutes = Time.TicketTime.slice(3, 5)

    form.service = id
    form.date = new Date(date)
    form.date.setHours(hours, minutes, 0, 0)
    form.date.setHours(form.date.getHours() + 5)
    form.date.toISOString()
    form.user = service.service.user._id

    try {
      const data = await request("/tickets", "POST", { ...form })
      if (data.errors) {
        return data.errors.map((error) => {
          return message(error)
        })
      }

      message(data.message)

      form.cabinet = service.service.user.cabinet
      form.userName = service.service.user.name
      form.title = service.service.title
      form.ticketCreateDate = new Date()

      localStorage.removeItem(storageName)
      localStorage.setItem(
        "Ticket",
        JSON.stringify({
          ...form,
        })
      )

      setForm("")
      history.push("/ticketpage")
    } catch (e) {}
  }

  return (
    <div className="TimePage">
      <div>
        {!loading && service && active === "TimeTable" && <TimeTable service={service} tickets={tickets} date={date} changeComponentHandler={changeComponentHandler} backToCalendar={backToCalendar} />}

        {!loading && service && active === "ContactForm" && <ContactForm form={form} changeTimeTableHandler={changeTimeTableHandler} changeFormHandler={changeFormHandler} submitFormHandler={submitFormHandler} />}
      </div>
    </div>
  )
}
