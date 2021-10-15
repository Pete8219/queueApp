import React, { useState,  useEffect } from 'react'
import  DatePicker  from 'react-datepicker'
import styles from "./calendar.module.css"
import { registerLocale, setDefaultLocale } from "react-datepicker"
import ru from "date-fns/locale/ru"

registerLocale("ru", ru)

export const Calendar = ({props}) => {

    const { getCalendarDate, update } = props

    

    
    setDefaultLocale("ru")

    const [startDate, setStartDate ] = useState(new Date())
    

     useEffect(() => {
        if(update) {
            return
        }
        getCalendarDate(startDate)
    }, [startDate, getCalendarDate, update]) 

    return (
            <div className={styles.calendarBody}>
                <DatePicker
                    selected = {startDate}
                    onChange = { (date) => {getCalendarDate(date)}}
                    dateFormat= "P"
                    />
            </div>
    )
}
