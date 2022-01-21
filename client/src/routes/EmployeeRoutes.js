import React from "react";

import { AdminPage } from "../pages/admin/AdminPage";
import { Record } from "../components/Tickets/newRecord/Record";
import { TicketsPage } from "../pages/admin/TicketsPage";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { Layout } from "../components/Layout";
import { NotFound } from "../components/404/NotFound";

export const EmployeeRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <AdminPage />,
        },
        {
          path: "/record/new",
          element: <Record />,
        },
        {
          path: "/tickets",
          element: <TicketsPage />,
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
};
