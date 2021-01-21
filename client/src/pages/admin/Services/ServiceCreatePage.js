/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect } from "react"
import { useHttp } from "../../../hooks/http.hook"

import { CreateService } from "../../../components/Service/Create"

export const ServiceCreatePage = () => {
  const [users, setUsers] = useState("")
  const [categories, setCategories] = useState('')
  const { loading, request } = useHttp()
  
  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request("/users", "GET", null, {})
      setUsers(fetched)
    } catch (e) {}
  }, [request])

  useEffect(() => {
    const fetchCategories = async() => {
      try{
        const fetched = await request('/categories', "GET", null, {})
        setCategories(fetched)

      }catch(e) {}
    }
    fetchCategories()
  },[request])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  

  return <>{!loading && users && categories && <CreateService users={users} categories={categories} />}</>
}
