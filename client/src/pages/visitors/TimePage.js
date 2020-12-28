import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useHttp} from '../../hooks/http.hook'
import { TimeTable } from '../../components/Calendar/TimeTable'

export const TimePage = () => {
    const params = useParams()
    const {loading, request} = useHttp()
    const [service, setService] = useState('')
    const [tickets, setTickets] = useState('')

    const id = useParams().id 
    const date = params.date.split('.').reverse().join('-')   
    const ticketDate = new Date(date).toISOString()
    
    useEffect(() => {
        const fetchService = async () => {
          try {
            const fetched = await request(`/services/${id}`, "GET", null, {})
            setService(fetched)
          } catch (e) {}
        }
    
        fetchService()
      }, [request, id])


      useEffect(() => {
          const fetchTickets = async ()=> {
              try {
                  const fetched = await request(`/tickets/${id}/${ticketDate}`, 'GET', null, {})
                  setTickets(fetched)
              } catch(e) {}
          }
          fetchTickets()
      },[request, id, ticketDate])
    


    return (
        <>
            {!loading && service && 
            <TimeTable
            service={service}
            tickets={tickets}
            date={date} />}
        </>

    )

}