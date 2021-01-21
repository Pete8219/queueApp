import React, { useState, useEffect } from "react"
import { useHttp } from "../../../hooks/http.hook"
import { useParams } from "react-router-dom"
import { Detail } from "../../../components/Users/Detail"
import { useHistory } from "react-router-dom"

export const UserDetailPage = () => {
  const [user, setUser] = useState("")
  const [users, setUsers] = useState("")
  const {loading, request} = useHttp()
  const history = useHistory()
  const userId = useParams().id

/*   const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request(`/users/${userId}`, "GET", null, {})
      setUser(fetched)
    } catch (e) {}
  }, [userId, request])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers]) */

  useEffect(() =>  {
    const fetchUsers = async () => {
      try {
        const fetched = await request(`/users/${userId}`, 'GET', null, {})
        setUser(fetched)

      } catch(e){}
    }
    fetchUsers()
  },[request, userId])

  useEffect(()=> {
    const fetchUserList = async() => {
      try {
        const fetched = await request('/users', 'GET', null, {})
        setUsers(fetched)

      }catch(e) {}
    }
    fetchUserList()
  },[request])

  // Handlers

  const cancelHandler = () => {
    history.push("/users")
  }

  return <>{!loading && user && users && <Detail user={user} users={users} cancelHandler={cancelHandler} />}</>
}
