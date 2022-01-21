import React from "react";

import { RecordEdit } from "../components/Tickets/RecordEdit/RecordEdit";
import { Record } from "../components/Tickets/newRecord/Record";
import { TicketsPage } from "../pages/admin/TicketsPage";
import { UserCreatePage } from "../pages/admin/Users/UserCreatePage";
import { UserDetailPage } from "../pages/admin/Users/UserDetailPage";
import { Main } from "../Main";
import { UsersList } from "../components/Users/UsersList";
import { CategoriesList } from "../components/Category/CategoriesList";
import { CreateCategory } from "../components/Category/CreateCategory";
import { EditCategory } from "../components/Category/EditCategory";
import { ServicesList } from "../components/Service/ServicesList";
import { EditService } from "../components/Service/EditService";
import { AppSettings } from "../components/Settings/AppSettings";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { CreateService } from "../components/Service/CreateService";
import { Layout } from "../components/Layout";
import { NotFound } from "../components/404/NotFound";

export const AdminRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/services",
          element: <ServicesList />,
          children: [
            { index: true, element: <ServicesList /> },
            { path: "/services/create", element: <CreateService /> },
            { path: "/services/edit", element: <EditService /> },
          ],
        },
        {
          path: "/categories",
          element: <CategoriesList />,
          children: [
            { index: true, element: <CategoriesList /> },
            { path: "/categories/create", element: <CreateCategory /> },
            { path: "/categories/edit/:id", element: <EditCategory /> },
          ],
        },
        {
          path: "/users",
          element: <UsersList />,
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
          path: "/main",
          element: <Main />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ];
};
