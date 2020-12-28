import React from "react"

export const TimeTable = ({service, tickets, date}) => {
console.log(tickets)
 
  //вытаскиваем из входящих параметров нужные нам данные для построение времени приема 
  const time = service.service.time
  const start = service.service.user.start
  const end = service.service.user.end
  const count = (end - start) * 60 / time


  //Формируем дату в нормальном формате используя входящий параметр date

  const timeArray = []
  
   for (let k = 0; k < count; k++) {
    const ticketDate = new Date(date)
    ticketDate.setHours(start, 0, 0)
    ticketDate.setMinutes(time * k)
    ticketDate.setHours(ticketDate.getHours() + 5)
  /*   let min = ticketDate.getMinutes().toString()
    min = min < 10 ? "0" + min : min */
    timeArray.push(ticketDate)
    /* timeArray.push({ hours: ticketDate.getHours().toString(), minutes: min }) */
  } 

  console.log(timeArray)

  const timeList = timeArray.map(item => {
    return(
      item.toISOString().slice(11, 16)
    )
  })

 

  return (
  
      <div className="row">
        <div className="card" style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}}>
          <p >{timeList}</p>
          
        </div>
      </div>

  )
}
