
import React, { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'

import { TimeList } from "../visitors/components/TimeList"

export const Time = () => {

    const localData = JSON.parse(localStorage.getItem('Items'))

    const {date, serviceId} = localData

    const {loading, request} = useHttp()
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        const fetchTickets = async()=> {
            try {
                const fetched = await request(`/tickets/${serviceId}/${date}`, 'GET', null, {})
                setTickets(fetched)

            } catch (e) {}
        }
        fetchTickets()
    },[request, serviceId, date])
    
    return (
       <>
        <TimeList />
       </>

    )
}