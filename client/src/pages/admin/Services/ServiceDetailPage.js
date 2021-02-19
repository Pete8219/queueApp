import React, { useState, useEffect } from "react"
import { useHttp } from "../../../hooks/http.hook"
import { Detail } from "../../../components/Service/Detail"
import { useParams } from "react-router-dom"

export const ServiceDetailPage = () => {
  const serviceId = useParams().id

  const [service, setService] = useState('')
  const [users, setUsers] = useState('')
  const [categories, setCategories] = useState('')
  const { loading, request } = useHttp()
  


  useEffect(() => {
    const fetchService = async() => {
      try {
        const fetched = await request(`/services/${serviceId}`, 'GET', null, {})
        setService(fetched)

      } catch (e) {}
    }
    fetchService()
    
  },[request, serviceId])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
          const fetched = await request('/users', 'GET', null)
          setUsers(fetched)
      } catch(e) {}
      
    }
    fetchUsers()
  }, [request])

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const fetched = await request('/categories', 'GET', null, {})
        setCategories(fetched)

      } catch(e) {}
    }
    fetchCategories()
  },[request])


  

  return <>{!loading && service && users  && <Detail service={service}  users={users} categories={categories}/>}</>
}
