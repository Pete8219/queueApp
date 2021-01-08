import React, { useEffect } from "react"

import M from "materialize-css/dist/js/materialize.min.js"

export const TicketCheck = ({ data, printHandler }) => {
  useEffect(() => {
    M.AutoInit()
  }, [])

  const ticketDate = data.date.slice(0, 10)
  const ticketTime = data.date.slice(11, 16)
  const fullName = `${data.lastname} ${data.firstname} ${data.surname}`
  const ticketData = {
    ticketDate: ticketDate.split("-").reverse().join("-"),
    ticketTime,
    fullName: fullName.toUpperCase(),
    cabinet: data.cabinet,
    userName: data.userName.toUpperCase(),
    title: data.title,
    ticketCreateDate: data.ticketCreateDate.slice(0, 10).split("-").reverse().join("-"),
  }

  return (
    <div>
      <button class="btn-small col s4 waves-effect waves-light" type="submit" name="action" onClick={printHandler} style={{ margin: "0 auto", marginTop: "2rem" }}>
        Печать талона
        <i class="material-icons right">local_printshop</i>
      </button>
      <blockquote>Распечатайте Ваш талон нажав на кнопку "Печать талона" или сфотографируйте талон на свой мобильный телефон</blockquote>
      <div className="row ticketCheck" style={{ display: "grid" }}>
        <div className="col s12 m6" style={{ display: "grid", margin: "0 auto" }}>
          <div className="card white" style={{ marginTop: "2rem" }}>
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
              <p>Дата формирования талона: {ticketData.ticketCreateDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
