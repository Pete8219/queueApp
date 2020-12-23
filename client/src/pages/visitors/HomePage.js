import React, {useState, useEffect, useCallback} from "react";
import { useHttp } from '../../hooks/http.hook'
import { Home } from '../../components/Home'


export const HomePage = () => {
    const [service, setService] = useState('')

    const {loading, request} = useHttp()

    const fetchService = useCallback( async () => {
        const fetched = await request('/services', "GET" , null , {})
        setService(fetched) 
    },[request])

    useEffect (() => {
        fetchService()
    },[fetchService])


    return (
       <>
       {!loading && service && 
       <Home 
       service={service}/>}
       </>
    )

}