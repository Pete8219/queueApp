import React, { useState, useEffect, useContext} from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useAuth } from '../../../hooks/auth.hook'
import { useHttp } from '../../../hooks/http.hook'
import { useMessage } from '../../../hooks/message.hook'

export const ListItem = ({ticket, i}) => {
    
    const {  token } = useAuth(AuthContext)
    const {  request } = useHttp()

    const [ status, setStatus] = useState(ticket.status)

    const message = useMessage()

    const changeRecord= (id) => {}

    const statusChange =  async (event) => {
        
            setStatus(event.target.value)
            const body = {
                status: event.target.value
            }

            try {
                const data = await request(`/tickets/status/${ticket._id}`, 'PATCH', body, {
                    Authorization: `Bearer ${token}`
                })
                message(data.message)
            } catch(e) {}
          
    }

    
    const fullName = `${ticket.firstname} ${ticket.lastname} ${ticket.surname}`
    const statusList = [
                        "В работе",
                        "Исполнено(проведена консультация)",
                        "Исполнено(принято заявление)",
                        "Исполнено(заявитель отказался подавать заяаление)",
                        "Отказ от записи",
                        "Не явился"
                        ]

    
    return (
        <tr>
                            <td>{i + 1}</td>
                            <td><a style={{textDecoration:"underline", cursor:"pointer"}} onClick={() => changeRecord(ticket._id)}> {fullName}</a></td>
                            <td>{ticket.phone || ''}</td>
                            <td>{ticket.date.slice(0,10).split('-').reverse().join('.')}</td>

                            <td>{ticket.date.slice(11, 16)}</td>
                            <td>
                            <select defaultValue={status} className="browser-default" data-ticket-id={ticket._id}  onChange={statusChange}>
                                {statusList.map((item, i) => {
                                return (
                                    <option key={i} value={item}>
                                    {item}
                                    </option>
                                )
                                })}

                            </select>
                            </td>
                        </tr>
    )
}
