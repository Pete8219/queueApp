import React from 'react'
import { useHistory } from 'react-router-dom'


export const EditTicket = ({serviceData, ticketData, userName, activeHandler}) => {
   
    const history = useHistory()
    
    const {date, firstname, lastname, surname} = ticketData

    const clickHandler = () => {
        history.push('/category')
    }

  
    return (
        <div className="container">
        
        <div className= "card" style={{padding:"20px", display:"grid"}}>
            <h4>Подробная информация о записи</h4>
             <div className="ticketFormContent" style={{marginTop:"2rem"}} >
                <span><b>Услуга:</b> {serviceData.title} </span>
                <span><b>Дата приема:</b> {date.slice(0,10).split('-').reverse().join('.')} </span>
                <span><b>Время приема:</b> {date.slice(11,16)} </span>
                <span><b>Кабинет:</b> {userName.cabinet} </span> 
                <span><b>Прием ведет:</b> {userName.name} </span> {//Здесь нужно выводить имя реального сотрдуника, который оказывает услугу
                }
                <span><b>Посетитель:</b> {firstname} {lastname} {surname} </span> 
                

            </div> 

            

        </div>
        <div className="row" style={{display:"grid"}}>
        <button className="waves-effect btn-large"  onClick= {clickHandler} >Перезаписать на другую дату</button>
        </div>
    </div>
    )
}