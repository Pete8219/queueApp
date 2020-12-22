import React, { useState, useEffect, useCallback } from "react"
import { useHttp } from "../../../hooks/http.hook"
import { useParams } from "react-router-dom"
import { Detail } from "../../../components/Users/Detail"
import { useHistory } from "react-router-dom"

export const UserDetailPage = () => {
  const [user, setUser] = useState("")
  const { loading, request } = useHttp()
  const history = useHistory()
  const userId = useParams().id

  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request(`/users/${userId}`, "GET", null, {})
      setUser(fetched)
    } catch (e) {}
  }, [userId, request])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // Handlers

  const cancelHandler = () => {
    history.push("/users")
  }

  return <>{!loading && user && <Detail detail={user} cancelHandler={cancelHandler} />}</>
}
