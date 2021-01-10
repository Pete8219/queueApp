import React, { useEffect, useState } from "react"
import { CalendarDay } from "./CalendarDay"
import { YearCalendar } from "./YearCalendar"
const storageName = "TicketTime"

export const CreateCalendar = (params) => {
  const service = params.params.service

  const { weekendAndHolidays, preHoliday } = YearCalendar()

  const month = new Date()
  const currentMonth = month.getMonth()

  let shortDay = 0

  useEffect(() => {
    localStorage.removeItem(storageName)
  }, [])

  const dateCal = []
  /* const time = [] */
  const dayOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]

  for (let i = 0; i < 30; i++) {
    const date = new Date()

    date.setDate(date.getDate() + i)
    const dayOfWeekName = dayOfWeek[date.getDay().toString()]
    const dayNumber = date.getDay()
    const dayOfMonth = date.getDate()

    dateCal.push({ date: date.toISOString(), dayOfWeekName: dayOfWeekName.toString(), dayNumber, dayOfMonth })
  }

  const lists = dateCal.map((item, index) => {
    let vision = "block"

    if ([0, 1, 6].includes(item.dayNumber)) {
      vision = "none"
    }

    if (weekendAndHolidays[currentMonth].includes(item.dayOfMonth)) {
      vision = "none"
    }

    //Если день предпраздничный, то заносим в переменную значение 1. Это значение равно 1 часу, для расчета времени приема
    if (preHoliday[currentMonth].includes(item.dayOfMonth)) {
      shortDay++
    }

    return (
      <li key={index} style={{ display: `${vision}` }}>
        {<CalendarDay service={service} day={item.date} shortDay={shortDay} />}
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
