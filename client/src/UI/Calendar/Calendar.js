import React, { useState,  useEffect } from 'react'
import  DatePicker  from 'react-datepicker'
import styles from "./calendar.module.css"
import { registerLocale, setDefaultLocale } from "react-datepicker"
import ru from "date-fns/locale/ru"

registerLocale("ru", ru)

export const Calendar = ({props}) => {

    const { updateDate, date } = props
    
    setDefaultLocale("ru")


    return (
            <div className={styles.calendarBody}>
                <DatePicker
                    selected = {date}
                    onChange = { (d) => {updateDate(d)}}
                    dateFormat= "P"
                    />
            </div>
    )
}
