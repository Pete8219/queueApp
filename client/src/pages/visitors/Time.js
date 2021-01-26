
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { TimeList } from "../visitors/components/TimeList"
import { YearCalendar } from '../../components/Calendar/YearCalendar'

export const Time = () => {
    const history = useHistory()
    if(!localStorage.length) {
        history.push('/')
    }

    const localData = JSON.parse(localStorage.getItem('Items'))
 
    

    const {date, serviceId} = localData
    const { preHoliday } = YearCalendar()
    const day =  new Date(date.split('.').reverse().join('-'))
   
    const month = day.getMonth()
    const isShort = preHoliday[month].includes( day.getDate()) ? 'true' :  'false'
    const hour = isShort === "true" ? 1 : 0
   

    const {loading, request} = useHttp()
    const [tickets, setTickets] = useState([])
    const [service,setService] = useState('')

    useEffect(() => {
        const fetchTickets = async()=> {
            try {
                const fetched = await request(`/tickets/${serviceId}/${date}`, 'GET', null, {})
                setTickets(fetched)

            } catch (e) {}
        }
        fetchTickets()
    },[request, serviceId, date])

    useEffect(() => {
        const fetchService = async() => {
            try {
                const fetched = await request(`/services/${serviceId}`, 'GET', null, {})
                setService(fetched)
            } catch(e){}
        } 
        fetchService()
    },[request, serviceId])

    
    
    return (
       <>
        {!loading && service && <TimeList service={service} tickets={tickets} date={date} day={day} hour={hour}/>}
       </>

    )
}