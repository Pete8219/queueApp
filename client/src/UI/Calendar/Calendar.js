import React, { useState,  useEffect } from 'react'
import  DatePicker  from 'react-datepicker'
import styles from "./calendar.module.css"
import { registerLocale, setDefaultLocale } from "react-datepicker"
import ru from "date-fns/locale/ru"

registerLocale("ru", ru)

export const Calendar = ({props}) => {

    const { getCalendarDate } = props
    setDefaultLocale("ru")

    const [startDate, setStartDate ] = useState(new Date())
    

     useEffect(() => {

        getCalendarDate(startDate)
    }, [startDate, getCalendarDate]) 

    return (
            <div className={styles.calendarBody}>
                <DatePicker
                    selected = {startDate}
                    onChange = { (date) => {setStartDate(date)}}
                    dateFormat= "P"
                    />
            </div>
    )
}
