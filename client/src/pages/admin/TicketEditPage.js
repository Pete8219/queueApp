import React, { useState, useEffect } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { EditTicket } from '../../components/Tickets/EditTicket'
import { Categories } from '../../pages/visitors/Categories'


export const TicketEditPage = () => {
    const {loading, request} = useHttp()

    const ticketData = JSON.parse(localStorage.getItem('TicketData'))
    
    const [serviceData, setServiceData] = useState('')
    const [active, setActive] = useState('ticket')

    const { service } = ticketData

     useEffect(() => {
        const fetchService = async() => {
            const fetched = await request(`/services/${service}`, 'GET', null, {})
            setServiceData(fetched)
        }

        fetchService()
    },[request, service]) 

    const activeHandler = () => {
        setActive('category')
    }


    console.log(serviceData)



    return (
        <>
            {!loading && serviceData && active === 'ticket' && <EditTicket ticketData={ticketData} serviceData={serviceData} activeHandler={activeHandler}/> }
            {!loading && active === 'category' && <Categories /> }
        </>
    )
}