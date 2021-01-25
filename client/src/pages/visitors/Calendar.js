/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { YearCalendar } from '../../components/Calendar/YearCalendar'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../../hooks/message.hook'
import M from "materialize-css/dist/js/materialize.min.js"
/* import DatePicker from "react-datepicker"
import { registerLocale, setDefaultLocale } from "react-datepicker"
import ru from "date-fns/locale/ru"
import subDays from "date-fns/subDays"
import addDays from "date-fns/addDays" */
/* registerLocale("ru", ru) */

export const Calendar = () => {
    const history = useHistory()
    const message = useMessage()
    const [date, setDate] = useState(null)

    const {weekendAndHolidays, preHoliday} = YearCalendar()  
    const days = [] 

    const daysWeek = ['Воскресенье', "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
    const localData = JSON.parse(localStorage.getItem('Items'))
    
    


for (let i = 0 ; i < 14; i++) {
const day = new Date()
day.setDate(day.getDate() + i)
const dayOfWeek = day.getDay()
const month = day.getMonth()

const isShort = preHoliday[month].includes( day.getDate()) ? 'true' :  'false'


if(!(weekendAndHolidays[month].includes( day.getDate() ))) {
    days.push({day, dayOfWeek, isShort}) 
} 

}
const daysList = days.map((item, i) => {
    return (
        <option key={i} value={item.day.toLocaleDateString()} data-short = {item.isShort}>{daysWeek[item.dayOfWeek]} - {item.day.toLocaleDateString()}</option>
    )
})

const goBackHandler = () => {
    history.go('-1')
}

const dateHandler = (event) => {
    setDate(event.target.value)
    localData.date = event.target.value
    if(event.target.value === "") {
        message('Пожалуйста выберите дату')
    }

    localStorage.setItem('Items', JSON.stringify(localData))
    history.push('/time')
}

useEffect(() => {
    M.AutoInit()
  }, [])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

    return (
        <div className="container" style={{display:"grid"}}>
            <h4 style={{textAlign:"center"}}>Выберите дату  приема</h4>
            <button className="waves-effect waves-light btn" onClick = {goBackHandler}>
                    <i className="material-icons left">arrow_back</i>Вернуться к выбору услуги
                </button>
            <div className="input field col s12" style={{display:"grid", margin:"0 auto",marginTop:"2rem", width:"100%"}}>
                {/* <p>Выберите дату приема</p> */}
                <select  defaultValue={date} onChange={dateHandler} style={{width:"100%"}}>
                    <option value="">Выберите дату</option>
                    {daysList}
                </select>
            </div>
        </div>
    )






    /* setDefaultLocale("ru")

    const [date, setDate] = useState(null)
    const [startDate, setStartDate] = useState(null)

    const changeDate = (date) => {
        setDate(date)
    }

    return (
        

        <div className="row timeTable" style={{display:"grid"}}>
            <h4>Выберите дату  приема</h4>
                 <a className="waves-effect waves-light btn">
                    <i className="material-icons left">arrow_back</i>Вернуться к выбору услуги
                </a>


                <div className="input-field col s12" style={{ zIndex: "100" }}>
                    <p>Выберите дату из календаря</p>
                    <DatePicker
                        selected = {startDate}  
                        onChange = {(date) => setStartDate(date)}
                        minDate = {subDays(new Date(), 0)}
                        maxDate = {addDays(new Date(), 14)}
                        dateFormat="dd/MM/yyyy" />
                </div>


        </div>
    ) */
}