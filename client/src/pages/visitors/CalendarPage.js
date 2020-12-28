import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { CreateCalendar } from "../../components/Calendar/CreateCalendar"



export const CalendarPage = () => {
  const id = useParams().id
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



  return <>{!loading && serviceData && <CreateCalendar params={serviceData} />}</>
}
