import React, { useState, useEffect, useCallback } from "react"
import { useHttp } from "../../../hooks/http.hook"
import { useParams } from "react-router-dom"
import { Detail } from "../../../components/Users/Detail"
import { useHistory } from "react-router-dom"

export const UserDetailPage = () => {
  const [user, setUser] = useState("")
  const [userList, setUserList] = useState("")
  const {loading, request} = useHttp()
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

  useEffect(()=> {
    const fetchUserList = async() => {
      try {
        const fetched = await request('/users', 'GET', null, {})
        setUserList(fetched)

      }catch(e) {}
    }
    fetchUserList()
  },[request])

  // Handlers

  const cancelHandler = () => {
    history.push("/users")
  }

  return <>{!loading && user && userList && <Detail detail={user} userList={userList} cancelHandler={cancelHandler} />}</>
}
