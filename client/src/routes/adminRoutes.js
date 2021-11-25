import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { RecordEdit } from "../components/Tickets/RecordEdit/RecordEdit";
import { AdminPage } from "../pages/admin/AdminPage";
import { CategoryPage } from "../pages/admin/CategoryPage";
import { Record } from "../pages/admin/newRecord/Record";
import { List } from "../pages/admin/Services/List";
import { ServiceCreatePage } from "../pages/admin/Services/ServiceCreatePage";
import { ServiceDetailPage } from "../pages/admin/Services/ServiceDetailPage";
import { TicketsPage } from "../pages/admin/TicketsPage";
import { UserPage } from "../pages/admin/UserPage";
import { UserCreatePage } from "../pages/admin/Users/UserCreatePage";
import { UserDetailPage } from "../pages/admin/Users/UserDetailPage";
import { Services } from "../pages/visitors/Services";
import { Staff } from "../pages/visitors/Staff";
import { Main } from "../Main";
import { UsersList } from "../components/Users/UsersList";

export const AdminRoutes = () => {
  const routes = [
    {
      path: "/main",
      component: Main,
    },

    {
      path: "/allservices",
      component: List,
    },
    {
      path: "/categories",
      component: CategoryPage,
    },
    {
      path: "/services",
      component: Services,
    },
    {
      path: "/service/detail/:id",
      component: ServiceDetailPage,
    },
    {
      path: "/services/create",
      component: ServiceCreatePage,
    },
    {
      path: "/users",
      component: UsersList,
    },
    {
      path: "/users/detail/:id",
      component: UserDetailPage,
    },
    {
      path: "/users/create",
      component: UserCreatePage,
    },
    {
      path: "/staff",
      component: Staff,
    },
    {
      path: "/tickets",
      component: TicketsPage,
    },
    {
      path: "/record/new",
      component: Record,
    },
    {
      path: "/record/edit",
      component: RecordEdit,
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
