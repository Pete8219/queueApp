import React from 'react'
import { useHistory } from 'react-router-dom'


export const TimeList = ({day, date, service, tickets, hour}) => {
    const localData = JSON.parse(localStorage.getItem("Items"))

    console.log(service)

    const userId = localData.user[0]._id // вытаскиваем Id пользователя из хранилища
    const users = service.user // достаем массив пользователей данной услуги
    console.log(userId)
    const selectedUser = users.filter((elem) => { //фильтруем только нужного нам пользователя
        return elem._id === userId
    })

    service.user = selectedUser

    console.log(service)

    

    const history = useHistory()

    const ticketsList = []
    if(tickets.length) {
         tickets.map(ticket => {
           return  ticketsList.push(ticket.date)
        }) 

        
    }

    

 
    const {time} = service
    const {start, end, vacationFrom,vacationTo, substitute, _id} = service.user[0]

    const serviceData = {...service}

    const countTickets = Math.floor((end - start - hour) * 60 / time)
  
    const startReceptionHour = day.setHours(start, 0, 0, 0)
    const startReception = new Date(startReceptionHour)

    const timeList = []
    let lists = []
    

    for (let i = 0; i < countTickets; i++) {
        const receptionTime = new Date(startReception)
        receptionTime.setMinutes(receptionTime.getMinutes() + i*time)
        
        receptionTime.setHours(receptionTime.getHours() + 5)
        timeList.push(receptionTime.toISOString())
    }
    
    
    if(!tickets.length) {
        console.log("А ничего нет")
        timeList.map(item => {
            return (
                lists.push(item)
            )
            
        })
    }

    const times = (timeList, ticketsList) => {
            const set =  new Set(ticketsList)
            return timeList.filter(x => !set.has(x))
        }

    lists = times(timeList, ticketsList)    
 
    if( Date.parse(day) >= Date.parse(vacationFrom) && Date.parse(day) <= Date.parse(vacationTo)) {
        serviceData.employee = substitute
    } else {
        serviceData.employee = _id
    } 

    const goBackHandler = () => {
        history.go('-1')
    } 

    const clickHandler = (event) => {
        const time = event.target.innerText
        const hours = time.slice(0,2)
        const minutes = time.slice(3,5)
        
        serviceData.hours = hours
        serviceData.minutes = minutes
        serviceData.date = date
        serviceData.serviceId = service._id
        localStorage.setItem('Items', JSON.stringify(serviceData))

        history.push('/contact')

        

    }


    return (

        <div className="container" style={{display:"grid"}}>
            <h4 style={{textAlign:"center"}}>Выберите время приема</h4>
            <button className="waves-effect waves-light btn" onClick = {goBackHandler}>
                    <i className="material-icons left">arrow_back</i>Выбрать другую дату
                </button>
            <div className="row col s12 time-container" >
            <ul className="row col s12 " >
             {lists.map((item, index) => {
                 return (
                    <li className="row col s12 blue darken-1 times" key={index} onClick={clickHandler}>{item.slice(11,16)}</li>
                 )
             })}
             </ul>   
             </div>
        </div>
    )

}