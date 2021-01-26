import React, { useState, useEffect } from "react"
import { useHttp } from "../../hooks/http.hook"
import { CategoryList } from "./components/CategoryList"
import { useHistory } from "react-router-dom"

export const Categories = () => {
  const history = useHistory()
  const { loading, request } = useHttp()

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetched = await request("categories/", "GET", null, {})
        setCategories(fetched)
      } catch (e) {}
    }
    fetchCategories()
  }, [request])

  const selectedHandler = (id) => {
    localStorage.setItem("Category", id)
    history.push("/services")
  }

  return <>{!loading && categories && <CategoryList categories={categories} handler={selectedHandler} />}</>
}
