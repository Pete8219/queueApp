import React, { useEffect, useState } from "react"
import { CalendarDay } from "./CalendarDay"
import { YearCalendar } from "./YearCalendar"
const storageName = "TicketTime"

export const CreateCalendar = (params) => {
  const service = params.params.service

  const { weekendAndHolidays, preHoliday } = YearCalendar()

  const month = new Date()
  const currentMonth = month.getMonth()

  
  useEffect(() => {
    localStorage.removeItem(storageName)
  }, [])

  const dateCal = []
  const dayOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]

  for (let i = 0; i < 30; i++) {
    const date = new Date()

    let isPreHoliday = false

    date.setDate(date.getDate() + i)
    const dayOfWeekName = dayOfWeek[date.getDay().toString()]
    const dayNumber = date.getDay()
    const dayOfMonth = date.getDate()
    //Если день предпраздничный, то заносим в isPreHoliday значение true. Это значение  для расчета времени приема в предпраздничный день
    if (preHoliday[currentMonth].includes(dayOfMonth)) {
      isPreHoliday = !isPreHoliday
    }


    dateCal.push({ date: date.toISOString(), dayOfWeekName: dayOfWeekName.toString(), dayNumber, dayOfMonth, isPreHoliday })
  }

  

  const lists = dateCal.map((item, index) => {
    let vision = "block"

    if ([0, 1, 6].includes(item.dayNumber)) {
      vision = "none"
    }
    if (weekendAndHolidays[currentMonth].includes(item.dayOfMonth)) {
      vision = "none"
    }


    return (
      <li key={index} style={{ display: `${vision}` }}>
        {<CalendarDay service={service} day={item.date} isPreHoliday={item.isPreHoliday} />}
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
