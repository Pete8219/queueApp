import React from "react"
import { useAuth } from "../../hooks/auth.hook"
import { Loader } from "../../components/Loader"
import { TicketList } from "../../components/Tickets/TicketList"
import { StaffProfile } from "../../components/Staff/StaffProfile"
import { TicketsMainPage } from "../../components/Tickets/TicketsMainPage"


export const AdminPage = () => {
  const { ready } = useAuth()

  if (!ready) {
    return <Loader />
  }
  return (
    <div>
       {/* <StaffProfile /> */}
       
       <TicketsMainPage />
    </div>
  )
}
