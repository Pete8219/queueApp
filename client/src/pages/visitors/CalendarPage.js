import React, { useState, useEffect, useMemo } from "react"
import {  useHistory } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { CreateCalendar } from "../../components/Calendar/CreateCalendar"
const storageName = "TimeData"

const getId = () => {
  return(
      JSON.parse(localStorage.getItem('ServiceData')) 
  )
}

export const CalendarPage = () => {
  const {id} = useMemo(() => getId(), [])

  /* const {id} = JSON.parse(localStorage.getItem('ServiceData')) */
  

  console.log(id)
 
  const history = useHistory()
  const [serviceData, setServiceData] = useState("")

  const { loading, request } = useHttp()

  useEffect(() => {
    const fetchService = async () => {
      try {
        const fetched = await request(`/services/${id}`, "GET", null, {})
        setServiceData(fetched)
      } catch (e) {}
    }

    fetchService()
  }, [request, id])

  useEffect(() => {
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    return () => {
      if (history.action === "POP") {
        history.push("")
      }
    }
  })

  return <>{!loading && serviceData && <CreateCalendar params={serviceData} />}</>
}
