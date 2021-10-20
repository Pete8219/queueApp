import React from 'react'
import  DatePicker  from 'react-datepicker'
import styles from "./calendar.module.css"
import { registerLocale, setDefaultLocale } from "react-datepicker"
import ru from "date-fns/locale/ru"

registerLocale("ru", ru)

export const Calendar = ({props}) => {

    const { updateDate, date, ...rest } = props


    const isWeekday = (date) => {
        const day = date.getDay(date)
        return day !==0 && day !==6 && day !==5
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
