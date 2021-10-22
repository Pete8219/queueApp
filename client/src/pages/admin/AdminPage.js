import React from "react"
import { useAuth } from "../../hooks/auth.hook"
import { Loader } from "../../components/Loader"
import { StaffProfile } from "../../components/Staff/StaffProfile"
import { TicketsMainPage } from "../../components/Tickets/TicketsMainPage"


export const AdminPage = () => {
  const { ready , userType } = useAuth()

  if (!ready) {
    return <Loader />
  }

  return (
    <div>
      {(userType === 'superAdmin') ? (
        <StaffProfile />
      ):
      <>
      <StaffProfile />
      <TicketsMainPage />
      </>
      }
    </div>
  )

}
