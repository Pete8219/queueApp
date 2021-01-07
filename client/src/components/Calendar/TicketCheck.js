import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"

import M from "materialize-css/dist/js/materialize.min.js"

export const TicketCheck = ({ data }) => {
  useEffect(() => {
    M.AutoInit()
  }, [])

  /*   const history = useHistory()

  useEffect(() => {
    return () => {
      if (history.action === "POP") {
        history.replace(location)
      }
    }
  }) */
  const ticketDate = data.date.slice(0, 10)
  const ticketTime = data.date.slice(11, 16)
  const fullName = `${data.lastname} ${data.firstname} ${data.surname}`
  const ticketData = {
    ticketDate: ticketDate.split("-").reverse().join("-"),
    ticketTime,
    fullName,
    cabinet: data.cabinet,
    userName: data.userName,
    title: data.title,
  }

  console.log(ticketData)

  return (
    <div>
      <div className="row ticketCheck" style={{ display: "grid" }}>
        <div className="col s12 m6" style={{ display: "grid", margin: "0 auto", marginTop: "2rem" }}>
          <div className="card white">
            <div className="card-content">
              <span className="black-text card-title ">Талон записи на прием</span>
              <p>
                Наименование услуги: <b>{ticketData.title}</b>
              </p>
              <p>Дата приема: {ticketData.ticketDate}</p>
              <p>Время приема: {ticketData.ticketTime}</p>
              <p>Кабинет: {ticketData.cabinet}</p>
              <p>Посетитель: {ticketData.fullName}</p>
              <p>Прием ведет: {ticketData.userName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
