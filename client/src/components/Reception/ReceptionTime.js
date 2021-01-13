import React from "react"

export const ReceptionTime = ({ date, shortDay, tickets, countTickets, userData }) => {
  console.log(tickets)
  const start = userData.user.start
  const end = userData.user.end
  const time = userData.time
  const hour = shortDay === "true" ? 1 : 0

  const allTickets = Math.floor(((end - start - hour) * 60) / time)

  //Формирование массива вывода времени приема

  const timeArray = []
  const currentDate = date.split(".").reverse().join("-")

  for (let k = 0; k < allTickets; k++) {
    const ticketDate = new Date(currentDate)
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
      <li key={item} value={item}>
        <div className="card blue darken-1">{item}</div>
      </li>
    )
  })

  return (
    <div className = "row timeTable">
   {/*    <p>таблица времени приема на {date}</p>
      <p>короткий день? {shortDay === "true" ? "Да" : "Нет"}</p>
      <p>талонов занято {countTickets}</p>
      <p>талонов свободно {allTickets - countTickets}</p> */}
      
      <ul className="timeList" >{timeList}</ul>
    </div>
  )
}
