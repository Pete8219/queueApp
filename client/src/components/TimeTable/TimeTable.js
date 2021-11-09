import React, {useState, useEffect } from 'react'
import { useHttp } from '../../hooks/http.hook'

import { formatDate } from "../../utils/formatDate"
import { YearCalendar } from '../Calendar/YearCalendar'
import { timeline } from '../../utils/timeline'
import styles from "./timetable.module.css"
import { CircleLoader } from '../CircleLoader'
import { getReadyToSubmission } from '../../utils/getReadyToSubmission'

export const TimeTable = ({props}) => {

    
    const { preHoliday } = YearCalendar() //импортируем из годового календаря массив предпраздничных дней
    
    const { date, employeeId, serviceId, serviceType } = props
    const { loading, request } = useHttp()
    const [tickets, setTickets] = useState([]) // список выданных тикетов на этот день
    const [selectedTime, setSelectedTime] = useState(null)
    const [isFree, setIsFree] = useState(null)
    const [ready, setReady] = useState(true)
    const [type, setType] = useState(serviceType)
    const [riders, setRiders] = useState([])
    const [times, setTimes] = useState([])
    

    const startReceipt = 14   //Время начала приема 14.00
    const endReceipt = 17    // Окончание приема 17.00
    const minReceiptTime = 15 // услуга с минимальным временем оказания

    
    const day = new Date(date)
    const month = date.getMonth(date)
    
    const shortDay = preHoliday[month].includes(day.getDate(date)) ? +1 : +0 //Определяем предпраздничный день или нет. Если Да, то время приема на час короче
  

    const records = timeline(startReceipt, endReceipt, shortDay, minReceiptTime)

    useEffect(()=> {
        setType(serviceType)
    },[serviceType])

    useEffect(() => {
        setSelectedTime(null) //Обнуляем значение выбранного времени
        
        const fetchTickets = async() => {
            try {
                const data = await request (`/tickets/${employeeId}/${formatDate(date)}`, 'GET', null, {})
                setTickets(data)
                setIsFree(null)
                
            } catch (error) {}
        }
        fetchTickets()
        
    },[date, request, employeeId])

    useEffect(() => {
        setReady(false)

        const checkTime = async() =>{
            if(selectedTime === null) {
                return
            }

                
            //устанавливаем время и записываем в полном формате дату и время выбранное в таблице времени приема
            const time = selectedTime
            const hour = time.slice(0,2)
            const minutes = time.slice(3,5)

            date.setHours(hour)
            date.setMinutes(minutes,0)
            
            localStorage.setItem('date', JSON.stringify(date))
        

            // отправка запроса с проверкой свободно выбранное время или нет

            try {
                const checking = await request(`/tickets/checkTime/${employeeId}/${selectedTime}`, 'GET', null, {}) 
                
                if(checking.length) { setIsFree(false) } //если вернулся пустой массив значит время свободно
                else { setIsFree(true) }
            
            } catch (error) {}
        }

        setTimeout(() => {
            setReady(true)
        }, 1000)

        checkTime()
    },[ employeeId, selectedTime, request ])

    useEffect(() => {
        setIsFree(null)
    },[ serviceId])


    useEffect(() => {

        records.map((record, index) => {
            getReadyToSubmission(records, index,record, serviceType)
        })
        setRiders(records)
        //console.log(records)
        
    },[type])


    //Если пришел массив тикетов, то для каждого элемента запускаем функцию проверки записи
    if(!loading && tickets.length > 0) {
       tickets.map((ticket)=> {
            let ticketTime = new Date(ticket.date).toLocaleTimeString().slice(0,5)
            let type = ticket.serviceType
            checkRecords(ticketTime, type)
            
        })
        
    } 
    
    //функция проверки массива временных меток приема. Если есть тикет с временем, то помечаем эту метку как занятую
    function checkRecords(ticketTime,type) {
        records.map((record, index) => {
            if(record.time === ticketTime) {
                getMarkTicket(index, type)
            }
        })
    }

//проверка сколько меток нужно сделать неактивными в зависимости от типа Услуги: Консультация или Подача документов
    function getMarkTicket(index,type) {
        if( type === "submission") {
            const k = 60 / minReceiptTime
            for (let i = 0; i < k; i++) {
                records[index + i].isBusy = true
            }
        } else {
            records[index].isBusy = true
        }


    }

    //проверка возможности записаться на выбранное время в зависимости от выбранного  типа записи

    const submissionCheck = (e,time) => {
        setSelectedTime(time)
   
    }

    const items = records.map((record, index) => {
            return (
                <div key={index} 
                    data-index = {index}
                    value={record.time}
                    className={ record.isBusy  ? styles.boxClear : styles.box}
                    onClick ={(e) => submissionCheck(e, record.time)}>
                    {record.time}
                </div>
            )
        })
    
    if (loading || !ready) {
        return <CircleLoader/>
    }  
    

    return (
        <div style={{width:"100%"}}>
        <div className={styles.Timebox}>
            {items}

        </div>
        <div style={{width:"100%", textAlign:"center"}}>
            {isFree === null ? null: (isFree ? <h5>{selectedTime} свободно</h5> : <h5>{selectedTime} уже занято</h5>)  }
            </div>
        </div>
    )
}