import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AdminPage } from "../pages/admin/AdminPage";
import { Record } from "../components/Tickets/newRecord/Record";
import { TicketsPage } from "../pages/admin/TicketsPage";
import { UserProfile } from "../components/UserProfile/UserProfile";

export const EmployeeRoutes = () => {
  const routes = [
    {
      path: "/",
      component: AdminPage,
    },
    {
      path: "/record/new",
      component: Record,
    },
    {
      path: "/tickets",
      component: TicketsPage,
    },
    {
      path: "/profile",
      component: UserProfile,
    },
  ];
  return (
    <Switch>
      {routes.map((route, i) => {
        return (
          <Route key={i} path={route.path} component={route.component} exact />
        );
      })}
      <Redirect to="/" />
    </Switch>
  );
};
