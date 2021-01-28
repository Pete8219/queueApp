
import React, { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { TicketForm } from './components/TicketForm'
import { NotFoundPage } from './components/NotFoundPage'
import { Loader } from '../../components/Loader'

export const Ticket = () => {

    const {loading, request, ready} = useHttp()
    const [name, setName] = useState('')
    const [data, setData] = useState('')
    
    useEffect(() => {
        const localData = localStorage.length !== null ? JSON.parse(localStorage.getItem('Items')) : null
        if(localData === null) {
            return <NotFoundPage />
              
        } else {
            setData(localData)
   
        }
    },[])

    if(!ready) {
        <Loader />
    }


    const {employee} = data

     useEffect(() => {
        if(!employee) {
            return
        }
         const fetchUser = async() => { 
                try {
                    const fetched = await request(`/users/welcome/${employee}`, 'GET', null , {})
                    setName(fetched)
                } catch(e) {}
            }
            fetchUser()
     
    },[request,employee])

    
    return (
        <>
           {!loading && data && name &&<TicketForm data={data} name={name}/>}
        </>
    )

}