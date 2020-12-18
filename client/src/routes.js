import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from './pages/admin/AuthPage'
import {HomePage} from './pages/visitors/HomePage'
import {AdminPage} from './pages/admin/AdminPage'
import {ServicePage} from './pages/admin/Services/ServicePage'
import {UserPage} from './pages/admin/UserPage'
import {TicketsPage} from './pages/admin/TicketsPage'
import {ServiceDetailPage} from './pages/admin/Services/ServiceDetailPage'


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                 <Route path="/" exact>
                    <AdminPage />
                </Route>
                <Route path="/services" exact>
                    <ServicePage />
                </Route>
                <Route path="/services/detail/:id" exact>
                    <ServiceDetailPage />
                </Route>
                <Route path="/users" exact>
                    <UserPage />
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
            <Route path ='/' exact>
                <HomePage />
            </Route>
            <Route path ='/auth/zhilye' exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />

        </Switch>
    )
}
