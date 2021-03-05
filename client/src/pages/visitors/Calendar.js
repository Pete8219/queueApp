/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react"
import { YearCalendar } from "../../components/Calendar/YearCalendar"
import { useHistory } from "react-router-dom"
import { useMessage } from "../../hooks/message.hook"
import M from "materialize-css/dist/js/materialize.min.js"

export const Calendar = () => {
  const history = useHistory()
  const message = useMessage()
  const [date, setDate] = useState(null)

  const { weekendAndHolidays, preHoliday } = YearCalendar()
  const days = []

  const daysWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
  const localData = JSON.parse(localStorage.getItem("Items"))
  const userData = JSON.parse(localStorage.getItem("userData"))

  if (localData === null) {
    history.push("/")
  }

  for (let i = 0; i < 14; i++) {
    const day = new Date()
    day.setDate(day.getDate() + i)
    const dayOfWeek = day.getDay()
    const month = day.getMonth()


     console.log(dayOfWeek)

    const isShort = preHoliday[month].includes(day.getDate()) ? "true" : "false"

    if (!weekendAndHolidays[month].includes(day.getDate()) && ![0,1,6].includes(day.getDate())) {
      days.push({ day, dayOfWeek, isShort })
    }
  }
  const daysList = days.map((item, i) => {
    return (
      <option key={i} value={item.day.toLocaleDateString()}>
        {daysWeek[item.dayOfWeek]} - {item.day.toLocaleDateString()}
      </option>
    )
  })

  const goBackHandler = () => {
    history.go("-1")
  }

  const dateHandler = (event) => {
    setDate(event.target.value)
    localData.date = event.target.value
    if (event.target.value === "") {
      message("Пожалуйста выберите дату")
    }

    const {user} = localData
    
    
    if(!userData) { // Проверяем авторизован ли пользователь
      
     const  onlineUser = user.filter(elem => {
        return elem.online === true
      })

      if(onlineUser.length > 1 ) {
        localStorage.setItem("Items", JSON.stringify(localData))
        history.push("/staff")
      } else {
  
      localStorage.setItem("Items", JSON.stringify(localData))
      history.push("/time")
      }

    } else {
      if(user.length > 1 ) {
        localStorage.setItem("Items", JSON.stringify(localData))
        history.push("/staff")
      } else {
  
      localStorage.setItem("Items", JSON.stringify(localData))
      history.push("/time")
      }
    }

    

  }

  useEffect(() => {
    M.AutoInit()
  }, [])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  return (
    <div className="container" style={{ display: "grid" }}>
      <h4 style={{ textAlign: "center" }}>Выберите дату приема</h4>
      <button className="waves-effect waves-light btn" onClick={goBackHandler}>
        <i className="material-icons left">arrow_back</i>Вернуться к выбору вопроса
      </button>
      <div className="input field col s12" style={{ display: "grid", margin: "0 auto", marginTop: "2rem", width: "100%" }}>
        <select className="browser-default" defaultValue={date} onChange={dateHandler} style={{ width: "100%" }}>
          <option value="">Выберите дату</option>
          {daysList}
        </select>
      </div>
    </div>
  )
}
