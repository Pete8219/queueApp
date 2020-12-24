import React from 'react'
import { CalendarDay } from './CalendarDay'

export const CreateCalendar = (params) => {
    const service = params.params.service
    const user = service.user
    
    
    const countAllTicket = (user.end - user.start) * 60 / service.time
    console.log(countAllTicket)

    for (let i = 0; i < 30; i++) {
        const date = new Date()
        date.setDate(date.getDate() + i)
        console.log(date)

        return (
            <>
            <CalendarDay key={i}
            countTickets={countAllTicket}
            date={date.toLocaleDateString()}
            service={service}/>
            </>
        )
    }


   
}