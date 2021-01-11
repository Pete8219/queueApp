import React, { useState, useEffect } from "react"
import { useHttp } from "../../hooks/http.hook"
import { Home } from "../../components/Home"
import { useHistory } from "react-router-dom"

export const HomePage = () => {
  localStorage.removeItem('ServiceData')

  const [service, setService] = useState("")
  const { loading, request } = useHttp()

  const history = useHistory()

  useEffect(() => {
    const fetchService = async () => {
      const result = await request("/services", "GET", null, {})
      setService(result)
    }
    fetchService()
  }, [request])

  useEffect(() => {
    return () => {
      if (history.action === "POP") {
        history.push("")
      }
    }
  })

  console.log(service)

  return <>{!loading && service && <Home service={service} />}</>
}
