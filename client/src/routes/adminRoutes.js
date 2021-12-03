import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { RecordEdit } from "../components/Tickets/RecordEdit/RecordEdit";
import { Record } from "../components/Tickets/newRecord/Record";
import { List } from "../pages/admin/Services/List";
import { ServiceCreatePage } from "../pages/admin/Services/ServiceCreatePage";
import { ServiceDetailPage } from "../pages/admin/Services/ServiceDetailPage";
import { TicketsPage } from "../pages/admin/TicketsPage";
import { UserCreatePage } from "../pages/admin/Users/UserCreatePage";
import { UserDetailPage } from "../pages/admin/Users/UserDetailPage";
import { Services } from "../pages/visitors/Services";
import { Staff } from "../pages/visitors/Staff";
import { Main } from "../Main";
import { UsersList } from "../components/Users/UsersList";
import { Categories } from "../pages/admin/Categories/Categories";
import { CategoryCreate } from "../pages/admin/Categories/CategoryCreate";
import { CategoryEdit } from "../pages/admin/Categories/CategoryEdit";

export const AdminRoutes = () => {
  //const link = JSON.parse(localStorage.getItem("link"));

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
      component: Categories,
    },
    {
      path: "/categories/create",
      component: CategoryCreate,
    },
    {
      path: "/categories/edit",
      component: CategoryEdit,
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
