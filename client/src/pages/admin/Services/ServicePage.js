import React, { useCallback,  useEffect, useContext } from 'react'
import {useState} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {useMessage} from '../../../hooks/message.hook'
import {AuthContext} from '../../../context/AuthContext'
import {ServicesList} from '../../../components/Service/Services'


export const ServicePage = () => {
    const [services, setServices] = useState([])
    const {loading, request} = useHttp()
    const message = useMessage()
    const {token} = useContext(AuthContext)

    const fetchServices = useCallback( async ()=> {
        try{
            const fetched = await request('/services', 'GET', null, {})
            setServices(fetched)

        } catch (e) {}
    }, [request])

    useEffect( () => {
        fetchServices()
    }, [fetchServices])

    
    const deleteHandler = async (id) => {
        try {
          const data = await request(`/services/${id}`, 'DELETE', null, {Authorization : `Bearer ${token}`})
          message(data.message)
          setServices(services.filter(({_id}) => id !==_id))
           
        } catch (e) {
  
  
        }
    }

    return (
       <>
            {!loading && <ServicesList 
            services={services}
            onDelete={deleteHandler} />}

       </>
    )
}