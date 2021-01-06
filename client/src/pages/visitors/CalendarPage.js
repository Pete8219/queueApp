import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { CreateCalendar } from "../../components/Calendar/CreateCalendar"
const storageName = "TimeData"

export const CalendarPage = () => {
  const id = useParams().id
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
