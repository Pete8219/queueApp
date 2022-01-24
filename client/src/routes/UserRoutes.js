import React from "react";
import { useRoutes } from "react-router-dom";
import { NotFound } from "../components/404/NotFound";
import { Layout } from "../components/Layout";
import { Record } from "../components/Tickets/newRecord/Record";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { CreateRequest } from "../components/VisitorRequest/CreateRequest";
//import { NewRequest } from "../components/VisitorRequest/NewRequest";
import { HomePage } from "../pages/visitor/HomePage";

export const UserRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "record/new",
          element: <Record />,
        },
        {
          path: "/profile",
          element: <UserProfile />,
        },
        {
          path: "/request/new",
          element: <CreateRequest />,
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
