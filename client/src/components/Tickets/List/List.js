import React, { useState, useEffect, useCallback } from 'react'
//import { AuthContext } from "../../../context/AuthContext"
import { useHttp } from "../../../hooks/http.hook"
//import { Loader } from '../../Loader'
import { ListItem } from './ListItem'
import { formatDate } from '../../../utils/formatDate'
import { Loader } from '../../Loader'


export const List = ({props}) => {

    const { userId, token, date, name } = props
    const { loading, request } = useHttp()
    const [ ticketList, setTicketList ] = useState([])


     useEffect(() => {
        const getTickets = async() => {
            
          try {
            const data = await request(`/tickets/find/${name}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
             setTicketList(data)
          } catch (error) {}

        } 

        getTickets()
    }, [name, request, token]) 
    
     useEffect(() => {

        const getTickets = async () => {
            try {
                const data = await request (`/tickets/ticketlist/${userId}/${formatDate(date)}`, 'GET', null , {
                    Authorization: `Bearer ${token}`
                })
                console.log(data)
                 setTicketList(data)
            } catch (e) {}
        }

        getTickets()
    },[date, userId, request, token])

    if(loading) {
        <Loader />
    }
  
    if(ticketList.length > 0) {
       return (
        <div className="row col s12">
            <div className="card" style={{padding:"20px"}}>
            <table className="striped">
                <thead style={{backgroundColor:"c2c2c2"}}>
                <tr>
                    <th>#</th>
                    <th>Посетитель</th>
                    <th>Телефон</th>
                    <th>Дата приема</th>
                    <th>Время</th>
                    <th>Статус</th>
                </tr>
                </thead>

                    <tbody>
                        {ticketList.map((ticket, index) => {
                            return (
                                <ListItem  key = {ticket._id} ticket= {ticket} i={index} />
                            )
                        })
                    }
               
                    </tbody>
                </table>
            </div>
        </div>
    ) }


    return (
        <div>
            <h1>Записей не найдено</h1>
        </div>
    )
}
