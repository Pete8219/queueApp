import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { AuthPage } from "./pages/admin/AuthPage"
/* import { HomePage } from "./pages/visitors/HomePage" */
import { AdminPage } from "./pages/admin/AdminPage"
import { ServicePage } from "./pages/admin/Services/ServicePage"
import { UserPage } from "./pages/admin/UserPage"
import { TicketsPage } from "./pages/admin/TicketsPage"
import { ServiceDetailPage } from "./pages/admin/Services/ServiceDetailPage"
import { ServiceCreatePage } from "./pages/admin/Services/ServiceCreatePage"
import { UserDetailPage } from "./pages/admin/Users/UserDetailPage"
import { UserCreatePage } from "./pages/admin/Users/UserCreatePage"
import { Calendar } from "./pages/visitors/Calendar"
import { Time } from "./pages/visitors/Time"
import { Contact } from './pages/visitors/Contact'
import { ReceptionPage } from "./pages/admin/Reception/ReceptionPage"
import { CategoryPage } from "./pages/admin/CategoryPage"
import { Categories } from "./pages/visitors/Categories"
import { Services } from "./pages/visitors/Services"
import { Ticket } from "./pages/visitors/Ticket"
export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <AdminPage />
        </Route>
        <Route path="/services" exact>
          <ServicePage />
        </Route>
        <Route path="/categories" exact>
          <CategoryPage />
        </Route>
        <Route path="/services/detail/:id" exact>
          <ServiceDetailPage />
        </Route>
        <Route path="/services/create" exact>
          <ServiceCreatePage />
        </Route>
        <Route path="/users" exact>
          <UserPage />
        </Route>
        <Route path="/users/detail/:id" exact>
          <UserDetailPage />
        </Route>
        <Route path="/users/create" exact>
          <UserCreatePage />
        </Route>
        <Route path="/reception" exact>
          <ReceptionPage />
        </Route>

        <Route path="/tickets" exact>
          <TicketsPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Categories />
      </Route>
      <Route path="/services" exact>
        <Services />
      </Route>
      <Route path="/calendar" exact>
        <Calendar />
      </Route>
      <Route path="/time" exact>
        <Time />
      </Route>
      <Route path="/contact" exact>
        <Contact />
      </Route>
      <Route path="/ticket" exact>
        <Ticket />
      </Route>
      <Route path="/auth/zhilye" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
