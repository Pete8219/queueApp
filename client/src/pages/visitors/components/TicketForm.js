import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../../hooks/http.hook'
import { useMessage } from '../../../hooks/message.hook'
import M from "materialize-css/dist/js/materialize.min.js"

export const TicketForm = ({data, name}) => {

    const { request, error, clearError } = useHttp()
    const message = useMessage()
    const history = useHistory()


    useEffect(() => {
        message(error)
        clearError()
      }, [message, error, clearError])


      useEffect(() => {
        M.AutoInit()
      }, [])

    const {title, date,  hours, minutes, firstname,lastname, surname, email} = data
    const {name: staffName, cabinet} = name
    

    const registerDate = new Date()
    //формируем объект для отпраки на бэкенд
    const formData ={
        service: `Услуга : ${title}`,
        ticketNumber:  `Талон на прием № ${staffName.slice(0,1)} - ${hours}/${minutes}`,
        visitor : `Посетитель:  ${firstname} ${surname} ${lastname}`,
        date: `Дата приема : ${date.split('-').reverse().join('-')}`,
        timeToReceipt: `Время приема: ${hours} : ${minutes}`,
        cab: `Кабинет:  ${cabinet}`,
        employee: `Прием ведет: ${staffName}`,
        registered: registerDate.toLocaleDateString(),
        email

    }


    const clickHandler = async () => {
        

        function goHome () {
            setTimeout(() => {
                history.push('/')
            }, 3000);
        }
           
        try {
            const data = await request("tickets/send", "POST", {...formData})
            message(data.message)
            goHome()

        } catch(e) {}
        
    }

    return (

        <div className="container ticket">
             
            <div className= "card ticketForm">
                
                <p style={{textDecoration:"underline", textAlign:"center"}}><b>Талон на прием № {name.name.slice(0,1)} - {hours}/{minutes}</b></p>
                    <div className="ticketFormContent" >
                        <span><b>Услуга:</b> {title} </span>
                        <span><b>Дата приема:</b> {date.split('-').reverse().join('-')} </span>
                        <span><b>Время приема:</b> {hours} : {minutes} </span>
                        <span><b>Кабинет:</b> {name.cabinet} </span>
                        <span><b>Прием ведет:</b> {name.name} </span>
                        <span><b>Посетитель:</b> {firstname} {lastname} {surname} </span>
                        <span><b>Дата регистрации:</b> {registerDate.toLocaleDateString()} </span>

                    </div>

            </div>

            <button  className="waves-effect btn-large" onClick= {clickHandler} >Отправить талон на Email и завершить регистрацию</button>

        </div>

    )
}