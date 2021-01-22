import React from 'react'
import { YearCalendar } from '../Calendar/YearCalendar'

export const ReceptionDate = ({date, shortDay, createDateHandler, changeShortDayStatus}) => {

const {weekendAndHolidays, preHoliday} = YearCalendar()  
const days = []


for (let i = 0 ; i < 30; i++) {
const day = new Date()
day.setDate(day.getDate() + i)
const month = day.getMonth()

const isShort = preHoliday[month].includes( day.getDate()) ? 'true' :  'false'


if(!(weekendAndHolidays[month].includes( day.getDate() ))) {
    days.push({day, isShort}) 
} 

}
const daysList = days.map((item, i) => {
    return (
        <option key={i} value={item.day.toLocaleDateString()} data-short = {item.isShort}>{item.day.toLocaleDateString()}</option>
    )
})

    return (
        <div className="row col s6" style={{display:"grid"}}>
            <div className="input field col s6" style={{display:"grid", margin:"0 auto"}}>
                <label >Выберите дату</label>
                <select className="browser-default" value={date.toString()} onChange={createDateHandler}>
                    <option value="Выберите дату">Выберите дату</option>
                    {daysList}
                </select>
            </div>
        </div>
    )
}