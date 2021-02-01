/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"

export const TimeTable = ({ service, tickets, date, shortDay, changeComponentHandler, backToCalendar }) => {
  //вытаскиваем из входящих параметров нужные нам данные для построение времени приема
  const time = service.service.time
  const start = service.service.user.start
  const end = service.service.user.end
  const count = ((end - start - shortDay) * 60) / time

  //Формируем дату в нормальном формате используя входящий параметр date

  const timeArray = []

  for (let k = 0; k < count; k++) {
    const ticketDate = new Date(date)
    ticketDate.setHours(start, 0, 0)
    ticketDate.setMinutes(time * k)
    ticketDate.setHours(ticketDate.getHours() + 5)
    timeArray.push(ticketDate.toISOString())
  }

  const busyTime = tickets.map((ticket) => {
    return ticket.date.toString()
  })

  const timer = []

  for (let i = 0; i < timeArray.length; i++) {
    if (!busyTime.includes(timeArray[i])) {
      timer.push(timeArray[i].slice(11, 16))
    }
  }

  const timeList = timer.map((item) => {
    return (
      <li key={item} value={item} onClick={() => changeComponentHandler({ item })}>
        <div className="card blue darken-1">{item}</div>
      </li>
    )
  })

  return (
    <div className="row timeTable ">
      <h4>Выберите свободное время приема </h4>
      <a className="waves-effect waves-light btn" onClick={backToCalendar}>
        <i className="material-icons left">arrow_back</i>Вернуться к выбору дня
      </a>
      <ul className="timeList">{timeList}</ul>
    </div>
  )
}
