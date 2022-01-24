import React from "react";

import { RecordEdit } from "../components/Tickets/RecordEdit/RecordEdit";
import { Record } from "../components/Tickets/newRecord/Record";
import { TicketsPage } from "../pages/admin/TicketsPage";
import { UserCreatePage } from "../pages/admin/Users/UserCreatePage";
import { UserDetailPage } from "../pages/admin/Users/UserDetailPage";
import { Main } from "../Main";
import { UsersList } from "../components/Users/UsersList";
import { Users } from "../components/Users/Users";
import { Categories } from "../components/Category/Categories";
import { CategoriesList } from "../components/Category/CategoriesList";
import { CreateCategory } from "../components/Category/CreateCategory";
import { EditCategory } from "../components/Category/EditCategory";
import { Services } from "../components/Service/Services";
import { ServicesList } from "../components/Service/ServicesList";
import { EditService } from "../components/Service/EditService";
import { AppSettings } from "../components/Settings/AppSettings";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { CreateService } from "../components/Service/CreateService";
import { Layout } from "../components/Layout";
import { NotFound } from "../components/404/NotFound";
import { useRoutes } from "react-router-dom";
import { App } from "../App";

export const AdminRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/services",
          element: <Services />,
          children: [
            { index: true, element: <ServicesList /> },
            { path: "/services/create", element: <CreateService /> },
            { path: "/services/edit", element: <EditService /> },
          ],
        },
        {
          path: "/categories",
          element: <Categories />,
          children: [
            { index: true, element: <CategoriesList /> },
            { path: "/categories/create", element: <CreateCategory /> },
            { path: "/categories/edit/:id", element: <EditCategory /> },
          ],
        },
        {
          path: "/users",
          element: <Users />,
          children: [
            { index: true, element: <UsersList /> },
            { path: "/users/create", element: <UserCreatePage /> },
            { path: "/users/detail/:id", element: <UserDetailPage /> },
          ],
        },
        {
          path: "/tickets",
          element: <TicketsPage />,
        },
        {
          path: "/record/new",
          element: <Record />,
        },
        {
          path: "/record/edit",
          element: <RecordEdit />,
        },
        {
          path: "/settings",
          element: <AppSettings />,
        },
        {
          path: "/profile",
          element: <UserProfile />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ];

  let element = useRoutes(routes);

  return <div>{element}</div>;
};
