import React, { useState, useEffect } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { useHistory } from 'react-router-dom'
import { ServiceList } from './ServiceList'


export const Reception = () => {

    const history = useHistory()
    const userData = JSON.parse(localStorage.getItem('userData'))

    const {loading, request} = useHttp()

    const { userId } = userData
    const [services, setServices] = useState('')

    useEffect(() => {
        if(!userId) {
            return
        }

        const fetchServices = async() => {
            try {
                 const fetched = await request (`/services/byUser/${userId}`, 'GET', null, {})
                 setServices(fetched)  
            } catch(e) {}
        }
        fetchServices()

    }, [request, userId])

    const clickHandler = (id) => {
        const items = {
            
            serviceId: id,
          }
          localStorage.setItem("Items", JSON.stringify(items))
        
        history.push('/calendar')
    }

    return (
        <>
            {!loading && services && <ServiceList services={services} handler={clickHandler}/>}
        </>
    )
}