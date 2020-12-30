import React, { useEffect } from "react"
import { CalendarDay } from "./CalendarDay"
const storageName = 'TicketTime'


export const CreateCalendar = (params) => {
  const service = params.params.service
  useEffect(() => {
    localStorage.removeItem(storageName)
  },[])


  const dateCal = []
  /* const time = [] */
  const dayOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]

  for (let i = 0; i < 30; i++) {
    const date = new Date()

    date.setDate(date.getDate() + i)
    const dayOfWeekName = dayOfWeek[date.getDay().toString()]
    const dayNumber = date.getDay()

    dateCal.push({ date: date.toISOString(), dayOfWeekName: dayOfWeekName.toString(), dayNumber: dayNumber })
  }

    const lists = dateCal.map((item, index) => {
    let vision = "block"

    if (item.dayNumber === 0 || item.dayNumber === 1 || item.dayNumber === 6) {
      vision = "none"
    }



    return (
      <li key={index} style={{ display: `${vision}` }}>
        {
          <CalendarDay
            service={service}
            day={item.date}

          />
        }
      </li>
    )
  })

  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Выберите удобный для Вас день</h4>
      <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gridGap: "1rem", textAlign: "center", color: "#fff", gridTemplateRows: "180px", gridAutoRows: "180px" }}>{lists}</ul>
    </div>
  )
}
