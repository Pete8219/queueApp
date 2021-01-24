import React, { useState, useEffect } from "react"
import { useHttp } from "../../hooks/http.hook"
import { CategoryList } from "./components/CategoryList"
import { ServiceList } from "./components/ServiceList"
import { useHistory } from "react-router-dom"

export const Categories = () => {
  const history = useHistory()
  const { loading, request } = useHttp()

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")
  const [services, setServices] = useState("")
  const [active, setActive] = useState("CategoryList")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetched = await request("categories/", "GET", null, {})

        setCategories(fetched)
      } catch (e) {}
    }
    fetchCategories()
  }, [request])

  useEffect(() => {
    if (!category.length) {
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

  const selectedHandler = (id) => {
    setCategory(id)
    setActive("ServiceList")
  }

  const actionHandler = (page) => {
    setActive(page)
  }

  const serviceHandler = (serviceId) => {
    console.log(serviceId)
  }

  return (
    <>
      {!loading && categories && active === "CategoryList" && <CategoryList categories={categories} handler={selectedHandler} />}
      {!loading && services && active === "ServiceList" && <ServiceList services={services} handler={serviceHandler} action={actionHandler} />}
    </>
  )
}
