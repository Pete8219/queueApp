import React, { useState, useEffect } from "react"
import { useHttp } from "../../hooks/http.hook"
import { ServiceList } from "./components/ServiceList"
import { Loader } from '../../components/Loader'
import { useHistory } from "react-router-dom"

export const Services = () => {
  const history = useHistory()
  const category = localStorage.getItem("Category")

  if (category === null) {
    history.push("/")
  }

  const [services, setServices] = useState("")
  const { loading, request } = useHttp()

  useEffect(() => {
    if (!category) {
      return
    }
    const fetchService = async () => {
      try {
        const fetched = await request(`/services/byCategory/${category}`, "GET", null, {})
        setServices(fetched)
      } catch (e) {}
    }
    fetchService()
  }, [request, category])

  if(loading) {
    return <Loader />
  }

  const ClickHandler = (id) => {
    const items = {
      categoryId: category,
      serviceId: id,
    }

    localStorage.setItem("Items", JSON.stringify(items))
    history.push("/calendar")
  }

  return <>{!loading && services && <ServiceList services={services} handler={ClickHandler} />}</>
}