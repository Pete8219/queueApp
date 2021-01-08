import React, { useEffect, useState } from "react"

import { TicketList } from "../../components/Tickets/TicketList"
import { useAuth } from "../../hooks/auth.hook"

import { Loader } from "../../components/Loader"
import { AuthContext } from "../../context/AuthContext"

export const AdminPage = () => {
  const { ready, login, logout, token, userId } = useAuth()

  const isAuthenticated = !!token

  const [id, setId] = useState("")

  useEffect(() => {
    setId(userId)
  }, [ready, userId])

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {isAuthenticated && <TicketList userId={id} />}
    </AuthContext.Provider>
  )
}
