import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { TimeList } from "../visitors/components/TimeList"
import { Loader } from '../../components/Loader'
import { YearCalendar } from "../../components/Calendar/YearCalendar"

export const Time = () => {
  const history = useHistory()
  const { preHoliday } = YearCalendar()
  let date = ""
  let serviceId = ""
  let day = ""
  let month = ""
  let isShort = ""
  let hour = ""

  const localData = JSON.parse(localStorage.getItem("Items"))

  if (localData === null) {
    history.push("/")
  } else {
    date = localData.date
    serviceId = localData.serviceId
    day = new Date(date.split(".").reverse().join("-"))
    month = day.getMonth()
    isShort = preHoliday[month].includes(day.getDate()) ? "true" : "false"
    hour = isShort === "true" ? 1 : 0
  }

  const { loading, request } = useHttp()
  const [tickets, setTickets] = useState([])
  const [service, setService] = useState("")
  
  date = (localData.date).split('.').reverse().join('-')

  useEffect(() => {
     if (!serviceId || !date) {
      return
    }
    
    
    const fetchTickets = async () => {
      try {
        const fetched = await request(`tickets/byService/${serviceId}/${date}`, "GET", null, {})
        console.log(fetched)
        
        setTickets(fetched)
      } catch (e) {}
    }
    fetchTickets()
  }, [request, serviceId, date])

  useEffect(() => {
    if (!serviceId) {
      return
    }
    const fetchService = async () => {
      try {
        const fetched = await request(`/services/${serviceId}`, "GET", null, {})
        setService(fetched)
      } catch (e) {}
    }
    fetchService()
  }, [request, serviceId])

  

  if(loading) {
    return <Loader />
  }


  return <>{!loading && service && <TimeList service={service} tickets={tickets} date={date} day={day} hour={hour} />}</>
}
