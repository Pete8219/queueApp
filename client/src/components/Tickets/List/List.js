import React, { useState, useEffect } from 'react'
import { useHttp } from "../../../hooks/http.hook"
import { ListItem } from './ListItem'
import { formatDate } from '../../../utils/formatDate'
import { Loader } from '../../Loader'
import { EditForm } from '../EditForm/EditForm'
import M from 'materialize-css'


export const List = ({props}) => {

    useEffect(() => {
        M.AutoInit()
    },[])

    
    let instance = {}

    const elem = document.getElementById('modalWindow')
        if(elem) {
            
            instance = M.Modal.getInstance(elem)
        }

    const { userId, token, date, name } = props
    const { loading, request } = useHttp()
    const [ ticketList, setTicketList ] = useState([])
    const [ editData, setEditData ] = useState([])
    

     useEffect(() => {
         if(!name) {
             return
         }
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

                 setTicketList(data)
            } catch (e) {}
        }

        getTickets()
    },[date, userId, request, token])




    const changeItem =  (id) => {
        
        const filterData = ticketList.filter(item => item._id === id)
        localStorage.setItem('ticketId', JSON.stringify(filterData))
        
        setEditData(filterData) 
        instance.open()
     
    }


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
                                
                                <ListItem  key = {ticket._id} ticket= {ticket} i={index} handler = {changeItem}/>
   
                            )
                        })
                    }
               
                    </tbody>
                </table>
            </div>

            <EditForm />
        </div>
    ) }


    return (
        <div>
            <h1>Записей не найдено</h1>
             <EditForm />
        </div>
    )
}
