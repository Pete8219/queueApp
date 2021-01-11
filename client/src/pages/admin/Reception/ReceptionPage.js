import React, { useState, useEffect } from 'react'
import { useHttp } from ".././../../hooks/http.hook"
import { ReceptionDate } from '../../../components/Reception/ReceptionDate'
import { ReceptionTime } from '../../../components/Reception/ReceptionTime'
import { ReceptionService } from "../../../components/Reception/ReceptionService"


export const ReceptionPage = () => {

    const {loading, request} = useHttp()
    const [service, setService] = useState('')
    const [selectedService, setSelectedService] = useState('')
    const [date, setDate] = useState("")
    const [shortDay, setShortDay] = useState(false)



    const createDateHandler = (event)=> {
        setDate(event.target.value)
        const short = event.target.options[event.target.selectedIndex].dataset.short
        setShortDay(short)
    }

    const changeService = (event) => {
        const id = event.target.options[event.target.selectedIndex].dataset.id
        const value = event.target.value
        setSelectedService({value, id})
    }


    useEffect(() => {
        const fetchService = async() => {
            try {
                const fetched = await request('/services', "GET", null, {})
                setService(fetched)

            } catch(e) {}
        }
        fetchService()

    },[ request])

    useEffect(() => {
        const serviceId = selectedService.id
        const selectedDate  = date.split('.').reverse().join('-') 

        const fetchTickets = async() => {
            try{
            const tickets = await request(`/tickets/${serviceId}/${selectedDate}`, "GET", null, {})
            console.log(tickets)
            } catch (e) {

            }
        }
        fetchTickets()

    },[date])




    return (

       <>
       <h4>Создание новой записи на прием</h4>
       {!loading && service && <ReceptionService service={service} selectedService={selectedService} changeService={changeService}/>}
       {selectedService &&<ReceptionDate date={date} shortDay={shortDay} createDateHandler={createDateHandler} />}
       {date && <ReceptionTime date={date} shortDay={shortDay} />}
       </>
    )
}