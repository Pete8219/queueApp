/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useAuth } from '../../../hooks/auth.hook'
import { useHttp } from '../../../hooks/http.hook'
import { useMessage } from '../../../hooks/message.hook'
import styles from "./list.module.css"


export const ListItem = ({ticket, i, handler, handleRewrite}) => {
  
    const {  token } = useAuth(AuthContext)
    const {  request } = useHttp()
    const message = useMessage()
    
    const [ status, setStatus] = useState(ticket.status)

    const statusChange =  async (event) => {
        const selIndex = event.target.options.selectedIndex
        const text = event.target.options[selIndex].outerText  
        const statusValue = event.target.value

                    
        setStatus(text)
            const body = {
                status: text,
                statusValue 
            }

            try {
                const data = await request(`/tickets/status/${ticket._id}`, 'PATCH', body, {
                    Authorization: `Bearer ${token}`
                })
                message(data.message)
            } catch(e) {}
          
    }

    
    const fullName = `${ticket.firstname} ${ticket.lastname} ${ticket.surname}`


    const statusObject = {
        pending: 'В работе',
        consultation: 'Исполнено(проведена консультация)',
        statement: 'Исполнено(принято заявление)',
        notStatement: 'Исполнено(заявитель отказался подавать заяаление)',
        refusal: 'Отказ от записи',
        notShow: 'Не явился'
    }

    const items= []

    for (let key in statusObject) {
       
        items.push(<option key = {key} value={statusObject[key]}>{statusObject[key]}</option>)
       
    }

        
    return (
        
        
                        <tr>
                            <td>{i + 1}</td>
                            <td><a className={styles.editLink} onClick={() =>  handler(ticket._id)}> {fullName}</a></td>
                            <td>{ticket.phone || ''}</td>
                            <td>{ticket.date.slice(0,10).split('-').reverse().join('.')}</td>

                            <td>{ticket.date.slice(11, 16)}</td>
                            <td>
                            
                            <select defaultValue={status} className="browser-default" data-ticket-id={ticket._id}  onChange={statusChange}>
                                {items}

                            </select>     

                            </td>
                            <td>
                                <button 
                                className={['btn-flat btn darken red', styles.Button].join(' ')}
                                onClick={()=> handleRewrite(ticket._id)} >
                                    Перезаписать
                                </button>
                            </td>
                        </tr>
                   
    )
    
}
