import React, {useState, useContext, useEffect, useCallback} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {AuthContext} from '../../../context/AuthContext'
import {Detail} from '../../../components/Service/Detail'
import {useParams} from 'react-router-dom'


export const ServiceDetailPage = ()=> {

    const [service, setService] = useState('')
    /* const {token} = useContext(AuthContext) */
    const {loading, request} = useHttp()
    const serviceId = useParams().id

    /* console.log(serviceId) */



    

    const fetchService = useCallback( async ()=> {
        try{
            const fetched = await request(`/services/${serviceId}`, 'GET', null, {})
            
            setService(fetched)

        } catch(e) {}
   
    }, [serviceId, request])


    useEffect( ()=> {
        fetchService()
    }, [fetchService])

    return (
        <>
            { !loading  && service && <Detail detail={service}  />}

        </>
    )
}