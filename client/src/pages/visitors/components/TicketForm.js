import React from 'react'
import { useHistory } from 'react-router-dom'
/*import { useMessage } from '../../../hooks/message.hook' */

export const TicketForm = ({data, name}) => {
    const history = useHistory()

    const {title, date,  hours, minutes, time, firstname,lastname, surname} = data

    const registerDate = new Date()

    const clickHandler = () => {
        history.push('/')
    }

    return (

        <div className="container ticket">
        {/* <blockquote>Сфотографируйте Ваш талон на мобильный телефон для предъявления на приеме</blockquote> */}
        <div className= "card ticketForm">
        <p style={{textDecoration:"underline", textAlign:"center"}}><b>Талон на прием № {name.name.slice(0,1)} - {hours}/{minutes}</b></p>
            <div className="ticketFormContent" >
                <span><b>Услуга:</b> {title} </span>
                <span><b>Дата приема:</b> {date} </span>
                <span><b>Время приема:</b> {hours} : {minutes} </span>
                <span><b>Кабинет:</b> {name.cabinet} </span>
                <span><b>Прием ведет:</b> {name.name} </span>
                <span><b>Посетитель:</b> {firstname} {lastname} {surname} </span>
                <span><b>Дата регистрации:</b> {registerDate.toLocaleDateString()} </span>

            </div>

            

        </div>
        <button className="waves-effect btn-large" onClick= {clickHandler}>Завершить регистрацию</button>
    </div>
    )
}