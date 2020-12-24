import React, { useState, useEffect } from "react"
import { CalendarDay } from "./CalendarDay"

export const CreateCalendar = (params) => {
  const service = params.params.service
  const user = service.user

  const countAllTicket = ((user.end - user.start) * 60) / service.time

  const dateCal = []

  for (let i = 0; i < 30; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)

    dateCal.push(date.toLocaleDateString().toString())
  }

  const lists = dateCal.map((item, index) => {
    return <li key={index}>{item}</li>
  })

  return (
    <div>
      <ul style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>{lists}</ul>
    </div>
  )
}
