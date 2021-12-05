import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { RecordEdit } from "../components/Tickets/RecordEdit/RecordEdit";
import { Record } from "../components/Tickets/newRecord/Record";

import { ServiceCreatePage } from "../pages/admin/Services/ServiceCreatePage";
import { TicketsPage } from "../pages/admin/TicketsPage";
import { UserCreatePage } from "../pages/admin/Users/UserCreatePage";
import { UserDetailPage } from "../pages/admin/Users/UserDetailPage";

import { Staff } from "../pages/visitors/Staff";
import { Main } from "../Main";
import { UsersList } from "../components/Users/UsersList";
import { CategoriesList } from "../components/Category/CategoriesList";
import { CreateCategory } from "../components/Category/CreateCategory";
import { EditCategory } from "../components/Category/EditCategory";
import { ServicesList } from "../components/Service/ServicesList";
import { EditService } from "../components/Service/EditService";

export const AdminRoutes = () => {
  //const link = JSON.parse(localStorage.getItem("link"));

  const routes = [
    {
      path: "/main",
      component: Main,
    },

    {
      path: "/allservices",
      component: ServicesList,
    },
    {
      path: "/categories",
      component: CategoriesList,
    },
    {
      path: "/categories/create",
      component: CreateCategory,
    },
    {
      path: "/categories/edit/:id",
      component: EditCategory,
    },
    {
      path: "/service/edit/:id",
      component: EditService,
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
