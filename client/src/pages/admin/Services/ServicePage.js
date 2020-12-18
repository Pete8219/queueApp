import React, { useCallback, useContext, useEffect } from 'react'
import {useState} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {AuthContext} from '../../../context/AuthContext'
import {ServicesList} from '../../../components/Service/Services'


export const ServicePage = () => {
    const [services, setServices] = useState([])
    const {loading, request} = useHttp()
    /* const {token} = useContext(AuthContext) */

    const fetchServices = useCallback( async ()=> {
        try{
            
            const fetched = await request('/services', 'GET', null, {})
            setServices(fetched)

        } catch (e) {}
    }, [request])

    useEffect( () => {
        fetchServices()
    }, [fetchServices])

    

    return (
       <>
            {!loading && <ServicesList services={services} />}

       </>
    )
}