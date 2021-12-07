import React, { useState, useEffect } from "react"
import { useHttp } from "../../hooks/http.hook"
import { CategoryList } from "./components/CategoryList"
import { useHistory } from "react-router-dom"
import { Loader } from '../../components/Loader'

export const Categories = () => {
  localStorage.removeItem('Items')
  localStorage.removeItem('Category')
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

  if(loading) {
    return <Loader />
  }

  const selectedHandler = (id) => {
    localStorage.setItem("Category", id)
    history.push("/service")
  }

  return <>{!loading && categories && <CategoryList categories={categories} handler={selectedHandler} />}</>
}
