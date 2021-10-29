import React from 'react'
import  DatePicker  from 'react-datepicker'
import styles from "./calendar.module.css"
import { registerLocale, setDefaultLocale } from "react-datepicker"
import ru from "date-fns/locale/ru"
import { YearCalendar } from "../../components/Calendar/YearCalendar"

registerLocale("ru", ru)

export const Calendar = ({props}) => {

    const { updateDate, date, ...rest } = props
    const { weekendAndHolidays } = YearCalendar()


    const isWeekday = (date) => {
        const day = date.getDay(date)
        const month = date.getMonth(date)
        return day !==0 && day !==6 && day !==5 && !weekendAndHolidays[month].includes(date.getDate())
    }
    
    setDefaultLocale("ru")


    return (
            <div className={styles.calendarBody}>
                <DatePicker
                    selected = {date}
                    onChange = { (d) => {updateDate(d)}}
                    dateFormat = "P"
                    filterDate = {rest.filterDay ? isWeekday : null}
                    minDate = { rest.minDate ? new Date() : null}
                    />
            </div>
    )
}
