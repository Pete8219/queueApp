
import React, { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { NotFoundPage } from './components/NotFoundPage'

export const Ticket = () => {

    const {loading, request} = useHttp()
    /* const [name, setName] = useState('') */
    const [data, setData] = useState('')
    
    useEffect(() => {
        const localData = localStorage.length !== null ? JSON.parse(localStorage.getItem('Items')) : null
        if(localData === null) {
            return <NotFoundPage />
              
        } else {
            
                setData(localData)
             
        }
    },[])

    console.log(data)
 

   /*  const registerDate = Date.now()
    const {date,employee, cabinet, hours, time, firstname,lastname, surname} = localData */


/*     useEffect(() => {
        if(!employee) {
            return
        }
        
            const fetchUser = async() => { 
                try {
                    const fetched = await request(`/users/${employee}`, 'GET', null , {})
                    setName(fetched)


                } catch(e) {}
            }
            fetchUser()

           
    },[employee]) */


    return (

        <div className="container">
            <h4>Талон на прием # {}</h4>
        </div>
    )
}