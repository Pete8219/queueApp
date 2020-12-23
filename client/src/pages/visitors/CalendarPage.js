import React, { useCallback, useState } from "react"
import { useParams } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"

export const CalendarPage = () => {
  const id = useParams().id
  const [serviceData, setServiceData] = useState("")

  const { request } = useHttp()

  const fetchService = useCallback(async () => {
    try {
      const fetched = await request(`/service/${id}`, "GET", null, {})
      setServiceData(fetched)
    } catch (e) {}
  }, [request])

  return (
    <div>
      <h1>Выберите день для записи</h1>
    </div>
  )
}
