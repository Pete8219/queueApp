import React from 'react'

export const ListItem = ({ticket, i}) => {
    


    const changeRecord= (id) => {
        
    }
    const statusChange = () => {}
    
    const fullName = `${ticket.firstname} ${ticket.lastname} ${ticket.surname}`
    const statusList = ["В работе", "Исполнено(проведена консультация)", "Исполнено(принято заявление)", "Исполнено(заявитель отказался подавать заяаление)", "Отказ от записи", "Не явился"]

    
    return (
        <tr>
                            <td>{i + 1}</td>
                            <td><a style={{textDecoration:"underline", cursor:"pointer"}} onClick={() => changeRecord(ticket._id)}> {fullName}</a></td>
                            <td>{ticket.phone || ''}</td>
                            <td>{ticket.date.slice(0,10).split('-').reverse().join('.')}</td>

                            <td>{ticket.date.slice(11, 16)}</td>
                            <td>
                            <select className="browser-default" data-ticket-id={ticket._id} value={ticket.status} onChange={statusChange}>
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
