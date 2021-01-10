import React from "react"
import { useAuth } from "../../hooks/auth.hook"
import { Loader } from "../../components/Loader"
import { TicketList } from "../../components/Tickets/TicketList"

export const AdminPage = () => {
  const { ready } = useAuth()

  if (!ready) {
    return <Loader />
  }
  return (
    <div>
      <TicketList />
    </div>
  )
}
