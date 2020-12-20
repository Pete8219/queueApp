import React, { useState, useCallback, useEffect } from "react"
import { useHttp } from "../../../hooks/http.hook"
import { useMessage } from "../../../hooks/message.hook"
import { CreateService } from "../../../components/Service/Create"

import axios from "axios"

export const ServiceCreatePage = () => {
  const [users, setUsers] = useState("")
  const { loading, request } = useHttp()
  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request("/users", "GET", null, {})
      setUsers(fetched)
    } catch (e) {}
  }, [request])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return <>{!loading && users && <CreateService data={users} />}</>
}
