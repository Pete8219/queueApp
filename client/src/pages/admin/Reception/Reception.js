import React, { useState, useEffect, useMemo } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { useHistory } from 'react-router-dom'
import { ServiceList } from './ServiceList'


export const Reception = () => {
    localStorage.removeItem('TicketData')

    const history = useHistory()
    const userData = JSON.parse(localStorage.getItem('userData'))

    const {loading, request} = useHttp()

    const { userId } = userData
    const [subUser, setSubUser] = useState('')
    const [services, setServices] = useState('')
    const [additionServices, setAdditionServices] = useState('')
    
    

    const currentDate = useMemo(() => {
        return (new Date()).toISOString()
    },[])
        
    

    

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

    useEffect(() => {

        //нужно найти записи пользователей, где сотрудник на текущую дату является замещающим

        const fetchUsers = async() => {
            try {
                const user = await request(`/users/substitute/${userId}/${currentDate.slice(0,10)}`, 'GET', null, {})
                setSubUser(user)

            } catch(e) {}
        }
        fetchUsers()

    },[request,userId, currentDate])

    useEffect(() => {
        //вытаскиваем все услуги того сотрудника, которого мы замещаем

        if(!subUser) {
            return
        }

        const fetchServices = async() => {
            const data = await request(`/services/byUser/${subUser}`, 'GET', null, {})
            setAdditionServices(data)

        }
        fetchServices()
    },[request, subUser])

    
    

    const clickHandler = (id) => {
        const items = {
            
            serviceId: id,
          }
          localStorage.setItem("Items", JSON.stringify(items))
        
        history.push('/calendar')
    }

    return (
        <>
            {!loading && services && <ServiceList services={services} additionServices = {additionServices} handler={clickHandler}/>}
        </>
    )
}