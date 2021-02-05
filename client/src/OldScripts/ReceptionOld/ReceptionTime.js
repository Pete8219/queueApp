import React from "react"

export const ReceptionTime = ({ date, shortDay, tickets, countTickets, userData, clickedId, clickHandler }) => {
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


  const differenceArray = (array1, array2) => {
    const set = new Set(array2)
    return array1.filter((x) => !set.has(x))
  }

  differenceArray(timeArray, busyTime)

  const timeList = timeArray.map((item, i) => {
    return (
      <li key={i} id = {i} value={item.slice(11, 16)} className={clickedId === i ? "card blue darken-3 " : "card blue darken-1"} onClick={() => clickHandler(i)}>
        {item.slice(11, 16)}
      </li>
    )
  })

  return (
    <div className="row timeTable receptionTime">
         <ul className="timeList">{timeList}</ul>
    </div>
  )
}
