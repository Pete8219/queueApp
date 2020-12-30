import React, { useState, useEffect, useCallback } from "react"
import { useParams } from 'react-router-dom'
import { useHttp} from '../../hooks/http.hook'
import { TimeTable } from '../../components/Calendar/TimeTable'
import { ContactForm } from '../../components/Calendar/ContactForm'
const storageName = 'TimeData'

export const TimePage = () => {
    const params = useParams()
    const {loading, request} = useHttp()
    const [service, setService] = useState('')
    
    const [tickets, setTickets] = useState('')
    const [active, setActive] = useState('TimeTable')
    const [ready, setReady] = useState('false')

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
    


    const changeComponentHandler = useCallback((data) => {

        localStorage.setItem(storageName, JSON.stringify({
            TicketTime: data.item
        }))
        
        setActive("ContactForm")
       /*  setReady('true') */
    }, [])


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data) {
            setActive("ContactForm")
        } else {
            setActive("TimeTable")
        }
       /*  setReady(true) */
    })

    return (
        <div className = "TimePage">
        <div>
           
            {!loading && service && !!ready && active === "TimeTable" && 
            <TimeTable
            service={service}
            tickets={tickets}
            date={date} 
            changeComponentHandler={changeComponentHandler}
            />}

            { active === "ContactForm" && ready && <ContactForm />}
        </div>    
            
            
        </div>

    )

}