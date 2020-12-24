import React, {useState, useEffect} from "react";
import { useHttp } from '../../hooks/http.hook'
import { Home } from '../../components/Home'


export const HomePage = () => {
    const [service, setService] = useState('')
    const {loading, request} = useHttp()

    

    useEffect (() => {
        const fetchService = async () => {
            const result = await request('/services', 'GET', null, {})
            setService(result)
            
        }
        fetchService()
    },[request])

     console.log(service) 

    return (
   
        <>
       {!loading && service && 
       <Home 
       service={service}/>}
       </>
    )

}