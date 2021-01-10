import React from "react"
import { useState, useEffect, useCallback } from "react"
/* import {AuthContext} from '../../context/AuthContext' */
import { useHttp } from "../../hooks/http.hook"
import { UsersList } from "../../components/Users/UsersList"
import { useMessage } from "../../hooks/message.hook"
import { useHistory } from "react-router-dom"

export const UserPage = () => {
  const [users, setUsers] = useState([])
  const { loading, request } = useHttp()
  const history = useHistory()
  const message = useMessage()
  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request("/users", "GET", null, {})
      setUsers(fetched)
    } catch (e) {}
  }, [request])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const deleteHandler = async (id) => {
    const data = await request(`/users/${id}`, "DELETE", null, {})
    message(data.message)
    setUsers(users.filter(({ _id }) => id !== _id))
  }
  const editHandler = (id) => {
    history.push(`/users/detail/${id}`)
  }

  const createHandler = () => {
    history.push("/users/create")
  }

  return <>{!loading && <UsersList users={users} onDelete={deleteHandler} onEdit={editHandler} onCreate={createHandler} />}</>
}
