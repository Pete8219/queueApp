import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { EditTicket } from '../../components/Tickets/EditTicket'
import { Categories } from '../pages/visitors/Categories'


export const TicketEditPage = () => {
    const {loading, request} = useHttp()

    const ticketData = JSON.parse(localStorage.getItem('TicketData'))
    
    const [serviceData, setServiceData] = useState('')
    const [userName, setUserName] = useState('')
    const [active, setActive] = useState('ticket')

    const { service, user } = ticketData

     useEffect(() => {
        const fetchService = async() => {
            const fetched = await request(`/services/${service}`, 'GET', null, {})
            setServiceData(fetched)
        }

        fetchService()
    },[request, service]) 

    useEffect(() => {
        const fetchUser = async() => {
            const fetched = await request(`/users/welcome/${user}`, 'GET', null, {})
            setUserName(fetched)
        }
        fetchUser()
    },[request, user])

    const activeHandler = () => {
        setActive('category')
    }


    return (
        <>
            {!loading && serviceData && userName && active === 'ticket' && <EditTicket ticketData={ticketData} serviceData={serviceData} userName={userName} activeHandler={activeHandler}/> }
            {!loading && active === 'category' && <Categories /> }
        </>
    )
}