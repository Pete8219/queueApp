import React from "react";
import { AuthPage } from "../pages/admin/AuthPage";
import { Register } from "../pages/Register";
import { SuccessRegistration } from "../components/SuccessRegistration/SuccessRegistration";
import { NotFound } from "../components/404/NotFound";
import { Confirm } from "../pages/Confirm";
import { Layout } from "../components/Layout";

export const UnAuthorizeRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Layout /> },
        {
          path: "/login",
          element: <AuthPage />,
        },
        { path: "/register", element: <Register /> },
        { path: "/success_registration", element: <SuccessRegistration /> },
        { path: "/confirm/:code", element: <Confirm /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ];
};
